import { describe, it, expect } from 'vitest';
import { ParserFactory } from '../src/parserFactory';
import { NodeDumper } from '../src/nodeDumper';
import { NodeTraverser } from '../src/nodeTraverser';
import { NodeVisitorAbstract } from '../src/nodeVisitor';
import { NodeFinder } from '../src/nodeFinder';
import { NameResolver } from '../src/nodeVisitor/nameResolver';
import { PrettyPrinter } from '../src/prettyPrinter';
import { Node } from '../src/node';
import { CollectingErrorHandler } from '../src/errorHandler';

describe('Integration Tests', () => {
  const factory = new ParserFactory();
  const parser = factory.createForNewestSupportedVersion();
  const dumper = new NodeDumper();
  const printer = new PrettyPrinter();
  const finder = new NodeFinder();

  describe('Parse → Dump roundtrip', () => {
    it('should handle complex class with all features', () => {
      const code = `<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Contracts\\Auth\\Authenticatable;

#[Entity]
class User extends Model implements Authenticatable {
    use HasFactory;

    const STATUS_ACTIVE = 1;

    public string $name;
    protected ?int $age = null;

    public function __construct(
        public readonly string $email
    ) {
        parent::__construct();
    }

    public function isActive(): bool {
        return $this->status === self::STATUS_ACTIVE;
    }

    public static function create(array $data): static {
        return new static($data['email']);
    }
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();

      const output = dumper.dump(ast);
      expect(output).toContain('Stmt_Namespace');
      expect(output).toContain('Stmt_Use');
      expect(output).toContain('Stmt_Class');
      expect(output).toContain('Stmt_ClassMethod');
    });

    it('should handle enum with interface', () => {
      const code = `<?php
enum Suit: string {
    case Hearts = 'H';
    case Diamonds = 'D';
    case Clubs = 'C';
    case Spades = 'S';

    public function color(): string {
        return match($this) {
            Suit::Hearts, Suit::Diamonds => 'red',
            Suit::Clubs, Suit::Spades => 'black',
        };
    }
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_Enum');

      const output = dumper.dump(ast);
      expect(output).toContain('Stmt_EnumCase');
      expect(output).toContain('Stmt_ClassMethod');
    });

    it('should handle complex control flow', () => {
      const code = `<?php
function fibonacci(int $n): int {
    if ($n <= 0) {
        throw new \\InvalidArgumentException('N must be positive');
    }
    if ($n <= 2) {
        return 1;
    }
    $a = 1;
    $b = 1;
    for ($i = 3; $i <= $n; $i++) {
        $temp = $a + $b;
        $a = $b;
        $b = $temp;
    }
    return $b;
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_Function');
    });

    it('should handle closures and arrow functions', () => {
      const code = `<?php
$items = [1, 2, 3, 4, 5];
$even = array_filter($items, fn($x) => $x % 2 === 0);
$doubled = array_map(function($x) { return $x * 2; }, $items);
$sum = array_reduce($items, function($carry, $item) {
    return $carry + $item;
}, 0);
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast!.length).toBe(4);
    });

    it('should handle try-catch with multiple catches', () => {
      const code = `<?php
try {
    $result = riskyOperation();
} catch (\\RuntimeException $e) {
    echo "Runtime error: " . $e->getMessage();
} catch (\\InvalidArgumentException | \\TypeError $e) {
    echo "Argument error: " . $e->getMessage();
} finally {
    cleanup();
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_TryCatch');
    });
  });

  describe('NodeFinder integration', () => {
    it('should find all method declarations in a class', () => {
      const ast = parser.parse(`<?php
class Foo {
    public function bar() {}
    private function baz() {}
    protected static function qux() {}
}
`);
      expect(ast).not.toBeNull();
      const methods = finder.find(ast!, (node: Node) => node.getType() === 'Stmt_ClassMethod');
      expect(methods.length).toBe(3);
    });

    it('should find all variables', () => {
      const ast = parser.parse('<?php $a = $b + $c * $d;');
      const vars = finder.find(ast!, (node: Node) => node.getType() === 'Expr_Variable');
      expect(vars.length).toBe(4);
    });

    it('should find all function calls', () => {
      const ast = parser.parse('<?php foo(bar(baz()));');
      const calls = finder.find(ast!, (node: Node) => node.getType() === 'Expr_FuncCall');
      expect(calls.length).toBe(3);
    });
  });

  describe('Name resolution integration', () => {
    it('should resolve class names in namespace', () => {
      const code = `<?php
namespace App\\Services;

use App\\Models\\User;
use App\\Contracts\\UserService as UserServiceContract;

class AuthService implements UserServiceContract {
    public function getUser(): User {
        return new User();
    }
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();

      const nameResolver = new NameResolver();
      const traverser = new NodeTraverser();
      traverser.addVisitor(nameResolver);
      traverser.traverse(ast!);

      // Verify name context is set up
      expect(nameResolver.getNameContext()).not.toBeNull();
    });
  });

  describe('Traverser modification', () => {
    it('should count nodes', () => {
      const ast = parser.parse('<?php $a = 1; $b = 2; echo $a + $b;');
      let count = 0;
      const traverser = new NodeTraverser();
      traverser.addVisitor(new class extends NodeVisitorAbstract {
        enterNode(node: Node) {
          count++;
          return null;
        }
      });
      traverser.traverse(ast!);
      expect(count).toBeGreaterThan(5);
    });
  });

  describe('Complex PHP features', () => {
    it('should parse generator function', () => {
      const code = `<?php
function fibonacci(): Generator {
    $a = 0;
    $b = 1;
    while (true) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_Function');
    });

    it('should parse interface with constants and methods', () => {
      const code = `<?php
interface Repository {
    const SORT_ASC = 'asc';
    const SORT_DESC = 'desc';

    public function find(int $id): ?object;
    public function findAll(string $sort = self::SORT_ASC): array;
    public function save(object $entity): void;
    public function delete(int $id): bool;
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_Interface');
    });

    it('should parse trait with abstract method', () => {
      const code = `<?php
trait Timestampable {
    public ?string $createdAt = null;
    public ?string $updatedAt = null;

    public function touch(): void {
        $this->updatedAt = date('Y-m-d H:i:s');
    }
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_Trait');
    });

    it('should parse match with complex conditions', () => {
      const code = `<?php
$result = match(true) {
    $x > 100 => 'large',
    $x > 10 => 'medium',
    $x > 0 => 'small',
    default => 'zero or negative',
};
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse nested function calls and method chains', () => {
      const code = `<?php
$result = collect($items)
    ->filter(fn($item) => $item->isActive())
    ->map(fn($item) => $item->toArray())
    ->values()
    ->toArray();
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse complex array operations', () => {
      const code = `<?php
$config = [
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'mydb',
    ],
    'cache' => [
        'driver' => 'redis',
        'ttl' => 3600,
    ],
];
$host = $config['database']['host'];
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast!.length).toBe(2);
    });

    it('should parse string interpolation', () => {
      const code = '<?php $msg = "Hello, $name!";';
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse heredoc', () => {
      const code = `<?php
$html = <<<HTML
<div class="container">
    <h1>Title</h1>
</div>
HTML;
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse nowdoc', () => {
      const code = `<?php
$text = <<<'EOT'
This is a nowdoc.
No interpolation here: $var
EOT;
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
    });

    it('should parse static analysis annotations', () => {
      const code = `<?php
/**
 * @param array<string, mixed> $data
 * @return Collection<int, User>
 */
function processData(array $data): object {
    return new stdClass();
}
`;
      const ast = parser.parse(code);
      expect(ast).not.toBeNull();
      expect(ast![0].getType()).toBe('Stmt_Function');
    });
  });

  describe('Parse → Print → Re-parse roundtrip', () => {
    function roundTrip(code: string): void {
      const ast1 = parser.parse(code);
      expect(ast1).not.toBeNull();
      const printed = printer.prettyPrintFile(ast1!);
      const ast2 = parser.parse(printed);
      expect(ast2).not.toBeNull();
      // Both should produce the same number of top-level statements
      expect(ast2!.length).toBe(ast1!.length);
      // Both should have the same top-level node types
      for (let i = 0; i < ast1!.length; i++) {
        expect(ast2![i].getType()).toBe(ast1![i].getType());
      }
    }

    it('should round-trip simple function', () => {
      roundTrip('<?php function foo($x) { return $x * 2; }');
    });

    it('should round-trip class with methods', () => {
      roundTrip(`<?php
class Calculator {
    public function add(int $a, int $b): int {
        return $a + $b;
    }
    public function subtract(int $a, int $b): int {
        return $a - $b;
    }
}`);
    });

    it('should round-trip if/elseif/else', () => {
      roundTrip(`<?php
if ($x > 0) {
    echo 'positive';
} elseif ($x < 0) {
    echo 'negative';
} else {
    echo 'zero';
}`);
    });

    it('should round-trip for loop', () => {
      roundTrip('<?php for ($i = 0; $i < 10; $i++) { echo $i; }');
    });

    it('should round-trip foreach', () => {
      roundTrip('<?php foreach ($items as $key => $value) { echo $value; }');
    });

    it('should round-trip switch', () => {
      roundTrip(`<?php
switch ($x) {
    case 1:
        echo 'one';
        break;
    case 2:
        echo 'two';
        break;
    default:
        echo 'other';
}`);
    });

    it('should round-trip try/catch/finally', () => {
      roundTrip(`<?php
try {
    foo();
} catch (Exception $e) {
    bar();
} finally {
    cleanup();
}`);
    });

    it('should round-trip closure', () => {
      roundTrip('<?php $f = function($x) { return $x * 2; };');
    });

    it('should round-trip arrow function', () => {
      roundTrip('<?php $f = fn($x) => $x * 2;');
    });

    it('should round-trip enum', () => {
      roundTrip('<?php enum Color { case Red; case Green; case Blue; }');
    });
  });

  describe('Error handling', () => {
    it('should throw for invalid PHP code', () => {
      expect(() => parser.parse('<?php function(')).toThrow();
    });

    it('should create collecting error handler', () => {
      const handler = new CollectingErrorHandler();
      expect(handler.getErrors()).toEqual([]);
    });
  });
});

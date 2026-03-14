import { describe, it, expect } from 'vitest';
import { BuilderFactory } from '../src/builderFactory';
import { ClassBuilder } from '../src/builder/class_';
import { MethodBuilder } from '../src/builder/method';
import { FunctionBuilder } from '../src/builder/function_';
import { InterfaceBuilder } from '../src/builder/interface_';
import { TraitBuilder } from '../src/builder/trait_';
import { EnumBuilder } from '../src/builder/enum_';
import { NamespaceBuilder } from '../src/builder/namespace_';
import { ParamBuilder } from '../src/builder/param';
import { PropertyBuilder } from '../src/builder/property';
import { UseBuilder } from '../src/builder/use_';
import { EnumCaseBuilder } from '../src/builder/enumCase';
import { ClassConstBuilder } from '../src/builder/classConst';
import { Modifiers } from '../src/modifiers';
import { Name } from '../src/node/name';
import { Int_ } from '../src/node/scalar/int';
import { String_ } from '../src/node/scalar/string';
import { Float_ } from '../src/node/scalar/float';

describe('BuilderFactory', () => {
  const factory = new BuilderFactory();

  it('should create ClassBuilder via factory', () => {
    const builder = factory.class_('User');
    expect(builder).toBeInstanceOf(ClassBuilder);
  });

  it('should create MethodBuilder via factory', () => {
    const builder = factory.method('getName');
    expect(builder).toBeInstanceOf(MethodBuilder);
  });

  it('should create FunctionBuilder via factory', () => {
    const builder = factory.function_('myFunc');
    expect(builder).toBeInstanceOf(FunctionBuilder);
  });

  it('should create InterfaceBuilder via factory', () => {
    const builder = factory.interface_('Serializable');
    expect(builder).toBeInstanceOf(InterfaceBuilder);
  });

  it('should create TraitBuilder via factory', () => {
    const builder = factory.trait_('Loggable');
    expect(builder).toBeInstanceOf(TraitBuilder);
  });

  it('should create EnumBuilder via factory', () => {
    const builder = factory.enum_('Color');
    expect(builder).toBeInstanceOf(EnumBuilder);
  });

  it('should create NamespaceBuilder via factory', () => {
    const builder = factory.namespace_('App\\Models');
    expect(builder).toBeInstanceOf(NamespaceBuilder);
  });

  it('should create ParamBuilder via factory', () => {
    const builder = factory.param('name');
    expect(builder).toBeInstanceOf(ParamBuilder);
  });

  it('should create PropertyBuilder via factory', () => {
    const builder = factory.property('name');
    expect(builder).toBeInstanceOf(PropertyBuilder);
  });

  it('should create UseBuilder via factory', () => {
    const builder = factory.use_('App\\Models\\User');
    expect(builder).toBeInstanceOf(UseBuilder);
  });

  it('should create EnumCaseBuilder via factory', () => {
    const builder = factory.enumCase('Red');
    expect(builder).toBeInstanceOf(EnumCaseBuilder);
  });

  it('should create ClassConstBuilder via factory', () => {
    const builder = factory.classConst('VERSION', new Int_(1));
    expect(builder).toBeInstanceOf(ClassConstBuilder);
  });
});

describe('BuilderFactory.val', () => {
  const factory = new BuilderFactory();

  it('should convert integer to Int_ node', () => {
    const node = factory.val(42);
    expect(node.getType()).toBe('Scalar_Int');
    expect((node as Int_).value).toBe(42);
  });

  it('should convert float to Float_ node', () => {
    const node = factory.val(3.14);
    expect(node.getType()).toBe('Scalar_Float');
    expect((node as Float_).value).toBe(3.14);
  });

  it('should convert string to String_ node', () => {
    const node = factory.val('hello');
    expect(node.getType()).toBe('Scalar_String');
    expect((node as String_).value).toBe('hello');
  });

  it('should convert true to ConstFetch node', () => {
    const node = factory.val(true);
    expect(node.getType()).toBe('Expr_ConstFetch');
    expect((node as any).name.toString()).toBe('true');
  });

  it('should convert false to ConstFetch node', () => {
    const node = factory.val(false);
    expect(node.getType()).toBe('Expr_ConstFetch');
    expect((node as any).name.toString()).toBe('false');
  });

  it('should convert null to ConstFetch node', () => {
    const node = factory.val(null);
    expect(node.getType()).toBe('Expr_ConstFetch');
    expect((node as any).name.toString()).toBe('null');
  });

  it('should convert array to Array_ node', () => {
    const node = factory.val([1, 2, 3]);
    expect(node.getType()).toBe('Expr_Array');
    expect((node as any).items.length).toBe(3);
    expect((node as any).items[0].value.value).toBe(1);
  });

  it('should pass through existing nodes', () => {
    const original = new Int_(99);
    const node = factory.val(original);
    expect(node).toBe(original);
  });
});

describe('ClassBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple class', () => {
    const node = factory.class_('User').getNode();
    expect(node.getType()).toBe('Stmt_Class');
    expect(node.name.toString()).toBe('User');
    expect(node.flags).toBe(0);
    expect(node.extends).toBeNull();
    expect(node.implements).toEqual([]);
    expect(node.stmts).toEqual([]);
  });

  it('should build class with extends', () => {
    const node = factory.class_('Admin').extend('User').getNode();
    expect(node.extends).toBeInstanceOf(Name);
    expect(node.extends.toString()).toBe('User');
  });

  it('should build class with implements', () => {
    const node = factory.class_('User')
      .implement('JsonSerializable', 'Stringable')
      .getNode();
    expect(node.implements.length).toBe(2);
    expect(node.implements[0].toString()).toBe('JsonSerializable');
    expect(node.implements[1].toString()).toBe('Stringable');
  });

  it('should build abstract class', () => {
    const node = factory.class_('Base').makeAbstract().getNode();
    expect(node.isAbstract()).toBe(true);
    expect(node.flags & Modifiers.ABSTRACT).toBeTruthy();
  });

  it('should build final class', () => {
    const node = factory.class_('Singleton').makeFinal().getNode();
    expect(node.isFinal()).toBe(true);
  });

  it('should build readonly class', () => {
    const node = factory.class_('DTO').makeReadonly().getNode();
    expect(node.isReadonly()).toBe(true);
  });

  it('should build class with statements', () => {
    const method = factory.method('getName').makePublic().getNode();
    const node = factory.class_('User')
      .addStmt(method)
      .getNode();
    expect(node.stmts.length).toBe(1);
    expect(node.stmts[0].getType()).toBe('Stmt_ClassMethod');
  });

  it('should build class with multiple statements via addStmts', () => {
    const m1 = factory.method('getName').makePublic().getNode();
    const m2 = factory.method('setName').makePublic().getNode();
    const node = factory.class_('User').addStmts([m1, m2]).getNode();
    expect(node.stmts.length).toBe(2);
  });

  it('should support fluent chaining', () => {
    const node = factory.class_('User')
      .extend('Base')
      .implement('JsonSerializable')
      .makeAbstract()
      .addStmt(factory.method('getName').makePublic().getNode())
      .getNode();
    expect(node.getType()).toBe('Stmt_Class');
    expect(node.isAbstract()).toBe(true);
    expect(node.extends.toString()).toBe('Base');
    expect(node.implements.length).toBe(1);
    expect(node.stmts.length).toBe(1);
  });

  it('should accept Name objects for extend and implement', () => {
    const node = factory.class_('User')
      .extend(new Name('App\\Base'))
      .implement(new Name('App\\Contracts\\Serializable'))
      .getNode();
    expect(node.extends.toString()).toBe('App\\Base');
    expect(node.implements[0].toString()).toBe('App\\Contracts\\Serializable');
  });
});

describe('MethodBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple method', () => {
    const node = factory.method('doSomething').getNode();
    expect(node.getType()).toBe('Stmt_ClassMethod');
    expect(node.name.toString()).toBe('doSomething');
    expect(node.flags).toBe(0);
    expect(node.params).toEqual([]);
    expect(node.stmts).toEqual([]);
  });

  it('should build public method', () => {
    const node = factory.method('getName').makePublic().getNode();
    expect(node.isPublic()).toBe(true);
    expect(node.flags & Modifiers.PUBLIC).toBeTruthy();
  });

  it('should build protected method', () => {
    const node = factory.method('getName').makeProtected().getNode();
    expect(node.isProtected()).toBe(true);
  });

  it('should build private method', () => {
    const node = factory.method('getName').makePrivate().getNode();
    expect(node.isPrivate()).toBe(true);
  });

  it('should build static method', () => {
    const node = factory.method('create').makePublic().makeStatic().getNode();
    expect(node.isStatic()).toBe(true);
    expect(node.isPublic()).toBe(true);
  });

  it('should build abstract method', () => {
    const node = factory.method('handle').makeAbstract().getNode();
    expect(node.isAbstract()).toBe(true);
    expect(node.stmts).toBeNull();
  });

  it('should build final method', () => {
    const node = factory.method('handle').makeFinal().getNode();
    expect(node.isFinal()).toBe(true);
  });

  it('should build method with params', () => {
    const param = factory.param('name').setType('string').getNode();
    const node = factory.method('setName').addParam(param).getNode();
    expect(node.params.length).toBe(1);
    expect(node.params[0].getType()).toBe('Param');
  });

  it('should build method with multiple params via addParams', () => {
    const p1 = factory.param('first').getNode();
    const p2 = factory.param('second').getNode();
    const node = factory.method('setNames').addParams([p1, p2]).getNode();
    expect(node.params.length).toBe(2);
  });

  it('should build method with return type', () => {
    const node = factory.method('getName').setReturnType('string').getNode();
    expect(node.returnType).not.toBeNull();
    expect(node.returnType.toString()).toBe('string');
  });

  it('should build method with return by ref', () => {
    const node = factory.method('getRef').makeReturnByRef().getNode();
    expect(node.returnsByRef()).toBe(true);
  });

  it('should throw when adding stmts to abstract method', () => {
    const builder = factory.method('handle').makeAbstract();
    expect(() => builder.addStmt({} as any)).toThrow('Cannot add statements to an abstract method');
  });

  it('should throw when using addStmts on abstract method', () => {
    const builder = factory.method('handle').makeAbstract();
    expect(() => builder.addStmts([{} as any])).toThrow('Cannot add statements to an abstract method');
  });
});

describe('FunctionBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple function', () => {
    const node = factory.function_('myFunc').getNode();
    expect(node.getType()).toBe('Stmt_Function');
    expect(node.name.toString()).toBe('myFunc');
    expect(node.params).toEqual([]);
    expect(node.stmts).toEqual([]);
  });

  it('should build function with params', () => {
    const param = factory.param('x').setType('int').getNode();
    const node = factory.function_('double').addParam(param).getNode();
    expect(node.params.length).toBe(1);
  });

  it('should build function with return type', () => {
    const node = factory.function_('getInt').setReturnType('int').getNode();
    expect(node.returnType).not.toBeNull();
    expect(node.returnType.toString()).toBe('int');
  });

  it('should build function returning by ref', () => {
    const node = factory.function_('getRef').makeReturnByRef().getNode();
    expect(node.returnsByRef()).toBe(true);
  });

  it('should build function with statements', () => {
    const stmt = factory.class_('Inner').getNode();
    const node = factory.function_('wrap').addStmt(stmt).getNode();
    expect(node.stmts.length).toBe(1);
  });

  it('should build function with addStmts', () => {
    const s1 = factory.class_('A').getNode();
    const s2 = factory.class_('B').getNode();
    const node = factory.function_('wrap').addStmts([s1, s2]).getNode();
    expect(node.stmts.length).toBe(2);
  });
});

describe('InterfaceBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple interface', () => {
    const node = factory.interface_('Serializable').getNode();
    expect(node.getType()).toBe('Stmt_Interface');
    expect(node.name.toString()).toBe('Serializable');
    expect(node.extends).toEqual([]);
  });

  it('should build interface with extends', () => {
    const node = factory.interface_('FooInterface')
      .extend('BarInterface', 'BazInterface')
      .getNode();
    expect(node.extends.length).toBe(2);
    expect(node.extends[0].toString()).toBe('BarInterface');
    expect(node.extends[1].toString()).toBe('BazInterface');
  });

  it('should build interface with statements', () => {
    const method = factory.method('handle').makePublic().makeAbstract().getNode();
    const node = factory.interface_('Handler')
      .addStmt(method)
      .getNode();
    expect(node.stmts.length).toBe(1);
  });

  it('should accept Name objects for extends', () => {
    const node = factory.interface_('Foo')
      .extend(new Name('App\\Contracts\\Bar'))
      .getNode();
    expect(node.extends[0].toString()).toBe('App\\Contracts\\Bar');
  });
});

describe('TraitBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple trait', () => {
    const node = factory.trait_('Loggable').getNode();
    expect(node.getType()).toBe('Stmt_Trait');
    expect(node.name.toString()).toBe('Loggable');
    expect(node.stmts).toEqual([]);
  });

  it('should build trait with statements', () => {
    const method = factory.method('log').makePublic().getNode();
    const node = factory.trait_('Loggable').addStmt(method).getNode();
    expect(node.stmts.length).toBe(1);
  });

  it('should build trait with addStmts', () => {
    const m1 = factory.method('log').getNode();
    const m2 = factory.method('warn').getNode();
    const node = factory.trait_('Loggable').addStmts([m1, m2]).getNode();
    expect(node.stmts.length).toBe(2);
  });
});

describe('EnumBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple enum', () => {
    const node = factory.enum_('Color').getNode();
    expect(node.getType()).toBe('Stmt_Enum');
    expect(node.name.toString()).toBe('Color');
    expect(node.scalarType).toBeNull();
    expect(node.implements).toEqual([]);
  });

  it('should build backed enum with scalar type', () => {
    const node = factory.enum_('Color').setScalarType('string').getNode();
    expect(node.scalarType).not.toBeNull();
    expect(node.scalarType.toString()).toBe('string');
  });

  it('should build enum with implements', () => {
    const node = factory.enum_('Color')
      .implement('HasColor')
      .getNode();
    expect(node.implements.length).toBe(1);
    expect(node.implements[0].toString()).toBe('HasColor');
  });

  it('should build enum with cases', () => {
    const case1 = factory.enumCase('Red').getNode();
    const case2 = factory.enumCase('Green').getNode();
    const node = factory.enum_('Color')
      .addStmt(case1)
      .addStmt(case2)
      .getNode();
    expect(node.stmts.length).toBe(2);
  });

  it('should build backed enum with case values', () => {
    const case1 = factory.enumCase('Red').setValue(new String_('red')).getNode();
    const node = factory.enum_('Color')
      .setScalarType('string')
      .addStmt(case1)
      .getNode();
    expect(node.stmts.length).toBe(1);
    expect(node.stmts[0].expr.value).toBe('red');
  });
});

describe('NamespaceBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a namespace', () => {
    const node = factory.namespace_('App\\Models').getNode();
    expect(node.getType()).toBe('Stmt_Namespace');
    expect(node.name).not.toBeNull();
    expect(node.name!.toString()).toBe('App\\Models');
  });

  it('should build namespace with statements', () => {
    const classNode = factory.class_('User').getNode();
    const node = factory.namespace_('App\\Models')
      .addStmt(classNode)
      .getNode();
    expect(node.stmts!.length).toBe(1);
  });

  it('should build namespace with null name', () => {
    const node = factory.namespace_(null).getNode();
    expect(node.name).toBeNull();
  });

  it('should accept Name object', () => {
    const node = factory.namespace_(new Name('App\\Services')).getNode();
    expect(node.name!.toString()).toBe('App\\Services');
  });

  it('should build namespace with addStmts', () => {
    const c1 = factory.class_('A').getNode();
    const c2 = factory.class_('B').getNode();
    const node = factory.namespace_('App').addStmts([c1, c2]).getNode();
    expect(node.stmts!.length).toBe(2);
  });
});

describe('ParamBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple param', () => {
    const node = factory.param('name').getNode();
    expect(node.getType()).toBe('Param');
    expect(node.var.name).toBe('name');
    expect(node.type).toBeNull();
    expect(node.default).toBeNull();
    expect(node.byRef).toBe(false);
    expect(node.variadic).toBe(false);
  });

  it('should build param with type', () => {
    const node = factory.param('name').setType('string').getNode();
    expect(node.type).not.toBeNull();
    expect(node.type!.toString()).toBe('string');
  });

  it('should build param with class type', () => {
    const node = factory.param('user').setType('App\\User').getNode();
    expect(node.type).not.toBeNull();
    expect(node.type!.getType()).toBe('Name');
  });

  it('should build param with default value', () => {
    const node = factory.param('count').setDefault(new Int_(0)).getNode();
    expect(node.default).not.toBeNull();
    expect((node.default as any).value).toBe(0);
  });

  it('should build by-ref param', () => {
    const node = factory.param('ref').makeByRef().getNode();
    expect(node.byRef).toBe(true);
  });

  it('should build variadic param', () => {
    const node = factory.param('args').makeVariadic().getNode();
    expect(node.variadic).toBe(true);
  });

  it('should build public promoted param', () => {
    const node = factory.param('name').makePublic().setType('string').getNode();
    expect(node.isPublic()).toBe(true);
    expect(node.isPromoted()).toBe(true);
  });

  it('should build protected promoted param', () => {
    const node = factory.param('name').makeProtected().getNode();
    expect(node.isProtected()).toBe(true);
  });

  it('should build private promoted param', () => {
    const node = factory.param('name').makePrivate().getNode();
    expect(node.isPrivate()).toBe(true);
  });

  it('should build readonly param', () => {
    const node = factory.param('name').makePublic().makeReadonly().getNode();
    expect(node.isReadonly()).toBe(true);
  });

  it('should use builtin types as Identifier', () => {
    const builtins = ['array', 'callable', 'bool', 'float', 'int', 'string',
      'iterable', 'void', 'object', 'null', 'false', 'true', 'never', 'mixed'];
    for (const type of builtins) {
      const node = factory.param('x').setType(type).getNode();
      expect(node.type!.getType()).toBe('Identifier');
    }
  });
});

describe('PropertyBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple property', () => {
    const node = factory.property('name').getNode();
    expect(node.getType()).toBe('Stmt_Property');
    expect(node.flags).toBe(0);
    expect(node.props.length).toBe(1);
    expect(node.props[0].name.toString()).toBe('name');
  });

  it('should build public property', () => {
    const node = factory.property('name').makePublic().getNode();
    expect(node.isPublic()).toBe(true);
  });

  it('should build protected property', () => {
    const node = factory.property('name').makeProtected().getNode();
    expect(node.isProtected()).toBe(true);
  });

  it('should build private property', () => {
    const node = factory.property('name').makePrivate().getNode();
    expect(node.isPrivate()).toBe(true);
  });

  it('should build static property', () => {
    const node = factory.property('instance').makePrivate().makeStatic().getNode();
    expect(node.isStatic()).toBe(true);
    expect(node.isPrivate()).toBe(true);
  });

  it('should build readonly property', () => {
    const node = factory.property('id').makePublic().makeReadonly().getNode();
    expect(node.isReadonly()).toBe(true);
  });

  it('should build property with default value', () => {
    const node = factory.property('count').setDefault(new Int_(0)).getNode();
    expect(node.props[0].default).not.toBeNull();
    expect((node.props[0].default as any).value).toBe(0);
  });

  it('should build property with type', () => {
    const node = factory.property('name').setType('string').getNode();
    expect(node.type).not.toBeNull();
  });
});

describe('UseBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple use statement', () => {
    const node = factory.use_('App\\Models\\User').getNode();
    expect(node.getType()).toBe('Stmt_Use');
    expect(node.uses.length).toBe(1);
    expect(node.uses[0].name.toString()).toBe('App\\Models\\User');
  });

  it('should build use with alias', () => {
    const node = factory.use_('App\\Models\\User').as('UserModel').getNode();
    expect(node.uses[0].alias).not.toBeNull();
    expect(node.uses[0].alias.toString()).toBe('UserModel');
  });

  it('should build function use', () => {
    const node = factory.use_('App\\Helpers\\format').asFunction().getNode();
    expect(node.type).toBe(2); // TYPE_FUNCTION
  });

  it('should build constant use', () => {
    const node = factory.use_('App\\Constants\\VERSION').asConstant().getNode();
    expect(node.type).toBe(3); // TYPE_CONSTANT
  });

  it('should accept Name object', () => {
    const node = factory.use_(new Name('App\\Models\\User')).getNode();
    expect(node.uses[0].name.toString()).toBe('App\\Models\\User');
  });
});

describe('EnumCaseBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple enum case', () => {
    const node = factory.enumCase('Red').getNode();
    expect(node.getType()).toBe('Stmt_EnumCase');
    expect(node.name.toString()).toBe('Red');
    expect(node.expr).toBeNull();
  });

  it('should build enum case with value', () => {
    const node = factory.enumCase('Red').setValue(new String_('red')).getNode();
    expect(node.expr).not.toBeNull();
    expect((node.expr as any).value).toBe('red');
  });

  it('should build enum case with integer value', () => {
    const node = factory.enumCase('First').setValue(new Int_(1)).getNode();
    expect((node.expr as any).value).toBe(1);
  });
});

describe('ClassConstBuilder', () => {
  const factory = new BuilderFactory();

  it('should build a simple class constant', () => {
    const node = factory.classConst('VERSION', new Int_(1)).getNode();
    expect(node.getType()).toBe('Stmt_ClassConst');
    expect(node.consts.length).toBe(1);
    expect(node.consts[0].name.toString()).toBe('VERSION');
    expect((node.consts[0].value as any).value).toBe(1);
  });

  it('should build public class constant', () => {
    const node = factory.classConst('VERSION', new Int_(1)).makePublic().getNode();
    expect(node.isPublic()).toBe(true);
  });

  it('should build protected class constant', () => {
    const node = factory.classConst('VERSION', new Int_(1)).makeProtected().getNode();
    expect(node.isProtected()).toBe(true);
  });

  it('should build private class constant', () => {
    const node = factory.classConst('VERSION', new Int_(1)).makePrivate().getNode();
    expect(node.isPrivate()).toBe(true);
  });

  it('should build final class constant', () => {
    const node = factory.classConst('VERSION', new Int_(1)).makeFinal().getNode();
    expect(node.isFinal()).toBe(true);
  });
});

describe('Complex builder scenarios', () => {
  const factory = new BuilderFactory();

  it('should build a complete class with constructor, properties, and methods', () => {
    const classNode = factory.class_('User')
      .extend('Model')
      .implement('JsonSerializable')
      .addStmt(
        factory.property('name').makePrivate().setType('string').getNode()
      )
      .addStmt(
        factory.property('email').makePrivate().setType('string').getNode()
      )
      .addStmt(
        factory.method('__construct')
          .makePublic()
          .addParam(factory.param('name').setType('string').getNode())
          .addParam(factory.param('email').setType('string').getNode())
          .getNode()
      )
      .addStmt(
        factory.method('getName')
          .makePublic()
          .setReturnType('string')
          .getNode()
      )
      .addStmt(
        factory.method('jsonSerialize')
          .makePublic()
          .setReturnType('array')
          .getNode()
      )
      .getNode();

    expect(classNode.getType()).toBe('Stmt_Class');
    expect(classNode.name.toString()).toBe('User');
    expect(classNode.extends.toString()).toBe('Model');
    expect(classNode.implements.length).toBe(1);
    expect(classNode.stmts.length).toBe(5); // 2 props + 3 methods
  });

  it('should build an interface with method signatures', () => {
    const ifaceNode = factory.interface_('Repository')
      .extend('ReadableRepository')
      .addStmt(
        factory.method('find')
          .makePublic()
          .makeAbstract()
          .addParam(factory.param('id').setType('int').getNode())
          .setReturnType('object')
          .getNode()
      )
      .addStmt(
        factory.method('findAll')
          .makePublic()
          .makeAbstract()
          .setReturnType('array')
          .getNode()
      )
      .getNode();

    expect(ifaceNode.getType()).toBe('Stmt_Interface');
    expect(ifaceNode.stmts.length).toBe(2);
    expect(ifaceNode.extends.length).toBe(1);
  });

  it('should build a namespace with use statements and classes', () => {
    const nsNode = factory.namespace_('App\\Models')
      .addStmt(factory.use_('App\\Base\\Model').getNode())
      .addStmt(factory.use_('App\\Contracts\\Serializable').getNode())
      .addStmt(
        factory.class_('User')
          .extend('Model')
          .implement('Serializable')
          .getNode()
      )
      .getNode();

    expect(nsNode.getType()).toBe('Stmt_Namespace');
    expect(nsNode.stmts!.length).toBe(3);
    expect(nsNode.stmts![0].getType()).toBe('Stmt_Use');
    expect(nsNode.stmts![1].getType()).toBe('Stmt_Use');
    expect(nsNode.stmts![2].getType()).toBe('Stmt_Class');
  });

  it('should build a backed enum with cases and methods', () => {
    const enumNode = factory.enum_('Status')
      .setScalarType('string')
      .implement('HasLabel')
      .addStmt(factory.enumCase('Active').setValue(new String_('active')).getNode())
      .addStmt(factory.enumCase('Inactive').setValue(new String_('inactive')).getNode())
      .addStmt(
        factory.method('label')
          .makePublic()
          .setReturnType('string')
          .getNode()
      )
      .getNode();

    expect(enumNode.getType()).toBe('Stmt_Enum');
    expect(enumNode.stmts.length).toBe(3);
    expect(enumNode.scalarType.toString()).toBe('string');
  });

  it('should build a trait with methods and properties', () => {
    const traitNode = factory.trait_('HasTimestamps')
      .addStmt(
        factory.property('createdAt').makeProtected().setType('string').getNode()
      )
      .addStmt(
        factory.method('getCreatedAt')
          .makePublic()
          .setReturnType('string')
          .getNode()
      )
      .getNode();

    expect(traitNode.getType()).toBe('Stmt_Trait');
    expect(traitNode.stmts.length).toBe(2);
  });

  it('should build a class with class constants', () => {
    const classNode = factory.class_('Config')
      .addStmt(factory.classConst('VERSION', new String_('1.0.0')).makePublic().getNode())
      .addStmt(factory.classConst('MAX_RETRIES', new Int_(3)).makePublic().makeFinal().getNode())
      .getNode();

    expect(classNode.stmts.length).toBe(2);
    expect(classNode.stmts[0].getType()).toBe('Stmt_ClassConst');
    expect(classNode.stmts[1].isFinal()).toBe(true);
  });
});

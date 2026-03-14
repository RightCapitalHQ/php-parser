import { ClassBuilder } from './builder/class_';
import { MethodBuilder } from './builder/method';
import { FunctionBuilder } from './builder/function_';
import { InterfaceBuilder } from './builder/interface_';
import { TraitBuilder } from './builder/trait_';
import { EnumBuilder } from './builder/enum_';
import { NamespaceBuilder } from './builder/namespace_';
import { ParamBuilder } from './builder/param';
import { PropertyBuilder } from './builder/property';
import { UseBuilder } from './builder/use_';
import { EnumCaseBuilder } from './builder/enumCase';
import { ClassConstBuilder } from './builder/classConst';
import { Node } from './node';
import { Name } from './node/name';
import { Int_ } from './node/scalar/int';
import { Float_ } from './node/scalar/float';
import { String_ } from './node/scalar/string';
import { ConstFetch } from './node/expr/constFetch';
import { Array_ } from './node/expr/array';
import { ArrayItem } from './node/arrayItem';

export class BuilderFactory {
  namespace_(name: string | Name | null): NamespaceBuilder {
    return new NamespaceBuilder(name);
  }

  class_(name: string): ClassBuilder {
    return new ClassBuilder(name);
  }

  interface_(name: string): InterfaceBuilder {
    return new InterfaceBuilder(name);
  }

  trait_(name: string): TraitBuilder {
    return new TraitBuilder(name);
  }

  enum_(name: string): EnumBuilder {
    return new EnumBuilder(name);
  }

  method(name: string): MethodBuilder {
    return new MethodBuilder(name);
  }

  function_(name: string): FunctionBuilder {
    return new FunctionBuilder(name);
  }

  param(name: string): ParamBuilder {
    return new ParamBuilder(name);
  }

  property(name: string): PropertyBuilder {
    return new PropertyBuilder(name);
  }

  use_(name: string | Name): UseBuilder {
    return new UseBuilder(name);
  }

  enumCase(name: string): EnumCaseBuilder {
    return new EnumCaseBuilder(name);
  }

  classConst(name: string, value: Node): ClassConstBuilder {
    return new ClassConstBuilder(name, value);
  }

  /**
   * Convert a PHP value to its AST representation (Scalar nodes).
   */
  val(value: any): Node {
    return BuilderFactory.normalizeValue(value);
  }

  static normalizeValue(value: any): Node {
    if (value && typeof value === 'object' && typeof value.getType === 'function') {
      return value as Node;
    }

    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return new Int_(value);
      }
      return new Float_(value);
    }

    if (typeof value === 'string') {
      return new String_(value);
    }

    if (typeof value === 'boolean') {
      return new ConstFetch(new Name(value ? 'true' : 'false'));
    }

    if (value === null || value === undefined) {
      return new ConstFetch(new Name('null'));
    }

    if (Array.isArray(value)) {
      const items = value.map((item) => {
        return new ArrayItem(BuilderFactory.normalizeValue(item));
      });
      return new Array_(items);
    }

    if (typeof value === 'object') {
      const items = Object.entries(value).map(([key, val]) => {
        return new ArrayItem(
          BuilderFactory.normalizeValue(val),
          new String_(key),
        );
      });
      return new Array_(items);
    }

    throw new Error(`Cannot normalize value of type ${typeof value}`);
  }
}

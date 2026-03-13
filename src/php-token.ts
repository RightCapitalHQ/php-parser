// PHP Token IDs - matching PHP's token_get_all() constants
// We define our own since we're implementing the tokenizer in TypeScript

export const T_INCLUDE = 262;
export const T_INCLUDE_ONCE = 261;
export const T_EVAL = 260;
export const T_REQUIRE = 259;
export const T_REQUIRE_ONCE = 258;
export const T_LOGICAL_OR = 263;
export const T_LOGICAL_XOR = 264;
export const T_LOGICAL_AND = 265;
export const T_PRINT = 266;
export const T_YIELD = 267;
export const T_DOUBLE_ARROW = 268;
export const T_YIELD_FROM = 269;
export const T_PLUS_EQUAL = 270;
export const T_MINUS_EQUAL = 271;
export const T_MUL_EQUAL = 272;
export const T_DIV_EQUAL = 273;
export const T_CONCAT_EQUAL = 274;
export const T_MOD_EQUAL = 275;
export const T_AND_EQUAL = 276;
export const T_OR_EQUAL = 277;
export const T_XOR_EQUAL = 278;
export const T_SL_EQUAL = 279;
export const T_SR_EQUAL = 280;
export const T_POW_EQUAL = 281;
export const T_COALESCE_EQUAL = 282;
export const T_COALESCE = 283;
export const T_BOOLEAN_OR = 284;
export const T_BOOLEAN_AND = 285;
export const T_IS_EQUAL = 286;
export const T_IS_NOT_EQUAL = 287;
export const T_IS_IDENTICAL = 288;
export const T_IS_NOT_IDENTICAL = 289;
export const T_SPACESHIP = 290;
export const T_IS_SMALLER_OR_EQUAL = 291;
export const T_IS_GREATER_OR_EQUAL = 292;
export const T_SL = 293;
export const T_SR = 294;
export const T_INSTANCEOF = 295;
export const T_INT_CAST = 296;
export const T_DOUBLE_CAST = 297;
export const T_STRING_CAST = 298;
export const T_ARRAY_CAST = 299;
export const T_OBJECT_CAST = 300;
export const T_BOOL_CAST = 301;
export const T_UNSET_CAST = 302;
export const T_POW = 303;
export const T_NEW = 304;
export const T_CLONE = 305;
export const T_EXIT = 306;
export const T_IF = 307;
export const T_ELSEIF = 308;
export const T_ELSE = 309;
export const T_ENDIF = 310;
export const T_LNUMBER = 311;
export const T_DNUMBER = 312;
export const T_STRING = 313;
export const T_STRING_VARNAME = 314;
export const T_VARIABLE = 315;
export const T_NUM_STRING = 316;
export const T_INLINE_HTML = 317;
export const T_ENCAPSED_AND_WHITESPACE = 318;
export const T_CONSTANT_ENCAPSED_STRING = 319;
export const T_ECHO = 320;
export const T_DO = 321;
export const T_WHILE = 322;
export const T_ENDWHILE = 323;
export const T_FOR = 324;
export const T_ENDFOR = 325;
export const T_FOREACH = 326;
export const T_ENDFOREACH = 327;
export const T_DECLARE = 328;
export const T_ENDDECLARE = 329;
export const T_AS = 330;
export const T_SWITCH = 331;
export const T_ENDSWITCH = 332;
export const T_CASE = 333;
export const T_DEFAULT = 334;
export const T_BREAK = 335;
export const T_CONTINUE = 336;
export const T_GOTO = 337;
export const T_FUNCTION = 338;
export const T_CONST = 339;
export const T_RETURN = 340;
export const T_TRY = 341;
export const T_CATCH = 342;
export const T_FINALLY = 343;
export const T_THROW = 344;
export const T_USE = 345;
export const T_INSTEADOF = 346;
export const T_GLOBAL = 347;
export const T_STATIC = 348;
export const T_ABSTRACT = 349;
export const T_FINAL = 350;
export const T_PRIVATE = 351;
export const T_PROTECTED = 352;
export const T_PUBLIC = 353;
export const T_VAR = 354;
export const T_UNSET = 355;
export const T_ISSET = 356;
export const T_EMPTY = 357;
export const T_HALT_COMPILER = 358;
export const T_CLASS = 359;
export const T_TRAIT = 360;
export const T_INTERFACE = 361;
export const T_EXTENDS = 362;
export const T_IMPLEMENTS = 363;
export const T_OBJECT_OPERATOR = 364;
export const T_LIST = 365;
export const T_ARRAY = 366;
export const T_CALLABLE = 367;
export const T_LINE = 368;
export const T_FILE = 369;
export const T_DIR = 370;
export const T_CLASS_C = 371;
export const T_TRAIT_C = 372;
export const T_METHOD_C = 373;
export const T_FUNC_C = 374;
export const T_COMMENT = 375;
export const T_DOC_COMMENT = 376;
export const T_OPEN_TAG = 377;
export const T_OPEN_TAG_WITH_ECHO = 378;
export const T_CLOSE_TAG = 379;
export const T_WHITESPACE = 380;
export const T_START_HEREDOC = 381;
export const T_END_HEREDOC = 382;
export const T_DOLLAR_OPEN_CURLY_BRACES = 383;
export const T_CURLY_OPEN = 384;
export const T_PAAMAYIM_NEKUDOTAYIM = 385;
export const T_DOUBLE_COLON = T_PAAMAYIM_NEKUDOTAYIM;
export const T_NAMESPACE = 386;
export const T_NS_C = 387;
export const T_NS_SEPARATOR = 388;
export const T_ELLIPSIS = 389;
export const T_FN = 390;
export const T_OBJECT_OPERATOR_NULLSAFE = 391;
export const T_BAD_CHARACTER = 392;

// PHP 8.0+
export const T_NAME_QUALIFIED = 393;
export const T_NAME_FULLY_QUALIFIED = 394;
export const T_NAME_RELATIVE = 395;
export const T_MATCH = 396;
export const T_NULLSAFE_OBJECT_OPERATOR = 397;
export const T_ATTRIBUTE = 398;

// PHP 8.1+
export const T_ENUM = 399;
export const T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG = 400;
export const T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG = 401;
export const T_READONLY = 402;

// PHP 8.4+
export const T_PROPERTY_C = 403;
export const T_PUBLIC_SET = 404;
export const T_PROTECTED_SET = 405;
export const T_PRIVATE_SET = 406;

// PHP 8.5+
export const T_PIPE = 407;
export const T_VOID_CAST = 408;

// Increment/Decrement
export const T_INC = 409;
export const T_DEC = 410;

// Token name map
const tokenNames: Record<number, string> = {
  [T_INCLUDE]: 'T_INCLUDE',
  [T_INCLUDE_ONCE]: 'T_INCLUDE_ONCE',
  [T_EVAL]: 'T_EVAL',
  [T_REQUIRE]: 'T_REQUIRE',
  [T_REQUIRE_ONCE]: 'T_REQUIRE_ONCE',
  [T_LOGICAL_OR]: 'T_LOGICAL_OR',
  [T_LOGICAL_XOR]: 'T_LOGICAL_XOR',
  [T_LOGICAL_AND]: 'T_LOGICAL_AND',
  [T_PRINT]: 'T_PRINT',
  [T_YIELD]: 'T_YIELD',
  [T_DOUBLE_ARROW]: 'T_DOUBLE_ARROW',
  [T_YIELD_FROM]: 'T_YIELD_FROM',
  [T_PLUS_EQUAL]: 'T_PLUS_EQUAL',
  [T_MINUS_EQUAL]: 'T_MINUS_EQUAL',
  [T_MUL_EQUAL]: 'T_MUL_EQUAL',
  [T_DIV_EQUAL]: 'T_DIV_EQUAL',
  [T_CONCAT_EQUAL]: 'T_CONCAT_EQUAL',
  [T_MOD_EQUAL]: 'T_MOD_EQUAL',
  [T_AND_EQUAL]: 'T_AND_EQUAL',
  [T_OR_EQUAL]: 'T_OR_EQUAL',
  [T_XOR_EQUAL]: 'T_XOR_EQUAL',
  [T_SL_EQUAL]: 'T_SL_EQUAL',
  [T_SR_EQUAL]: 'T_SR_EQUAL',
  [T_POW_EQUAL]: 'T_POW_EQUAL',
  [T_COALESCE_EQUAL]: 'T_COALESCE_EQUAL',
  [T_COALESCE]: 'T_COALESCE',
  [T_BOOLEAN_OR]: 'T_BOOLEAN_OR',
  [T_BOOLEAN_AND]: 'T_BOOLEAN_AND',
  [T_IS_EQUAL]: 'T_IS_EQUAL',
  [T_IS_NOT_EQUAL]: 'T_IS_NOT_EQUAL',
  [T_IS_IDENTICAL]: 'T_IS_IDENTICAL',
  [T_IS_NOT_IDENTICAL]: 'T_IS_NOT_IDENTICAL',
  [T_SPACESHIP]: 'T_SPACESHIP',
  [T_IS_SMALLER_OR_EQUAL]: 'T_IS_SMALLER_OR_EQUAL',
  [T_IS_GREATER_OR_EQUAL]: 'T_IS_GREATER_OR_EQUAL',
  [T_SL]: 'T_SL',
  [T_SR]: 'T_SR',
  [T_INSTANCEOF]: 'T_INSTANCEOF',
  [T_INT_CAST]: 'T_INT_CAST',
  [T_DOUBLE_CAST]: 'T_DOUBLE_CAST',
  [T_STRING_CAST]: 'T_STRING_CAST',
  [T_ARRAY_CAST]: 'T_ARRAY_CAST',
  [T_OBJECT_CAST]: 'T_OBJECT_CAST',
  [T_BOOL_CAST]: 'T_BOOL_CAST',
  [T_UNSET_CAST]: 'T_UNSET_CAST',
  [T_POW]: 'T_POW',
  [T_NEW]: 'T_NEW',
  [T_CLONE]: 'T_CLONE',
  [T_EXIT]: 'T_EXIT',
  [T_IF]: 'T_IF',
  [T_ELSEIF]: 'T_ELSEIF',
  [T_ELSE]: 'T_ELSE',
  [T_ENDIF]: 'T_ENDIF',
  [T_LNUMBER]: 'T_LNUMBER',
  [T_DNUMBER]: 'T_DNUMBER',
  [T_STRING]: 'T_STRING',
  [T_STRING_VARNAME]: 'T_STRING_VARNAME',
  [T_VARIABLE]: 'T_VARIABLE',
  [T_NUM_STRING]: 'T_NUM_STRING',
  [T_INLINE_HTML]: 'T_INLINE_HTML',
  [T_ENCAPSED_AND_WHITESPACE]: 'T_ENCAPSED_AND_WHITESPACE',
  [T_CONSTANT_ENCAPSED_STRING]: 'T_CONSTANT_ENCAPSED_STRING',
  [T_ECHO]: 'T_ECHO',
  [T_DO]: 'T_DO',
  [T_WHILE]: 'T_WHILE',
  [T_ENDWHILE]: 'T_ENDWHILE',
  [T_FOR]: 'T_FOR',
  [T_ENDFOR]: 'T_ENDFOR',
  [T_FOREACH]: 'T_FOREACH',
  [T_ENDFOREACH]: 'T_ENDFOREACH',
  [T_DECLARE]: 'T_DECLARE',
  [T_ENDDECLARE]: 'T_ENDDECLARE',
  [T_AS]: 'T_AS',
  [T_SWITCH]: 'T_SWITCH',
  [T_ENDSWITCH]: 'T_ENDSWITCH',
  [T_CASE]: 'T_CASE',
  [T_DEFAULT]: 'T_DEFAULT',
  [T_BREAK]: 'T_BREAK',
  [T_CONTINUE]: 'T_CONTINUE',
  [T_GOTO]: 'T_GOTO',
  [T_FUNCTION]: 'T_FUNCTION',
  [T_CONST]: 'T_CONST',
  [T_RETURN]: 'T_RETURN',
  [T_TRY]: 'T_TRY',
  [T_CATCH]: 'T_CATCH',
  [T_FINALLY]: 'T_FINALLY',
  [T_THROW]: 'T_THROW',
  [T_USE]: 'T_USE',
  [T_INSTEADOF]: 'T_INSTEADOF',
  [T_GLOBAL]: 'T_GLOBAL',
  [T_STATIC]: 'T_STATIC',
  [T_ABSTRACT]: 'T_ABSTRACT',
  [T_FINAL]: 'T_FINAL',
  [T_PRIVATE]: 'T_PRIVATE',
  [T_PROTECTED]: 'T_PROTECTED',
  [T_PUBLIC]: 'T_PUBLIC',
  [T_VAR]: 'T_VAR',
  [T_UNSET]: 'T_UNSET',
  [T_ISSET]: 'T_ISSET',
  [T_EMPTY]: 'T_EMPTY',
  [T_HALT_COMPILER]: 'T_HALT_COMPILER',
  [T_CLASS]: 'T_CLASS',
  [T_TRAIT]: 'T_TRAIT',
  [T_INTERFACE]: 'T_INTERFACE',
  [T_EXTENDS]: 'T_EXTENDS',
  [T_IMPLEMENTS]: 'T_IMPLEMENTS',
  [T_OBJECT_OPERATOR]: 'T_OBJECT_OPERATOR',
  [T_LIST]: 'T_LIST',
  [T_ARRAY]: 'T_ARRAY',
  [T_CALLABLE]: 'T_CALLABLE',
  [T_LINE]: 'T_LINE',
  [T_FILE]: 'T_FILE',
  [T_DIR]: 'T_DIR',
  [T_CLASS_C]: 'T_CLASS_C',
  [T_TRAIT_C]: 'T_TRAIT_C',
  [T_METHOD_C]: 'T_METHOD_C',
  [T_FUNC_C]: 'T_FUNC_C',
  [T_COMMENT]: 'T_COMMENT',
  [T_DOC_COMMENT]: 'T_DOC_COMMENT',
  [T_OPEN_TAG]: 'T_OPEN_TAG',
  [T_OPEN_TAG_WITH_ECHO]: 'T_OPEN_TAG_WITH_ECHO',
  [T_CLOSE_TAG]: 'T_CLOSE_TAG',
  [T_WHITESPACE]: 'T_WHITESPACE',
  [T_START_HEREDOC]: 'T_START_HEREDOC',
  [T_END_HEREDOC]: 'T_END_HEREDOC',
  [T_DOLLAR_OPEN_CURLY_BRACES]: 'T_DOLLAR_OPEN_CURLY_BRACES',
  [T_CURLY_OPEN]: 'T_CURLY_OPEN',
  [T_PAAMAYIM_NEKUDOTAYIM]: 'T_PAAMAYIM_NEKUDOTAYIM',
  [T_NAMESPACE]: 'T_NAMESPACE',
  [T_NS_C]: 'T_NS_C',
  [T_NS_SEPARATOR]: 'T_NS_SEPARATOR',
  [T_ELLIPSIS]: 'T_ELLIPSIS',
  [T_FN]: 'T_FN',
  [T_BAD_CHARACTER]: 'T_BAD_CHARACTER',
  [T_NAME_QUALIFIED]: 'T_NAME_QUALIFIED',
  [T_NAME_FULLY_QUALIFIED]: 'T_NAME_FULLY_QUALIFIED',
  [T_NAME_RELATIVE]: 'T_NAME_RELATIVE',
  [T_MATCH]: 'T_MATCH',
  [T_NULLSAFE_OBJECT_OPERATOR]: 'T_NULLSAFE_OBJECT_OPERATOR',
  [T_ATTRIBUTE]: 'T_ATTRIBUTE',
  [T_ENUM]: 'T_ENUM',
  [T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG]: 'T_AMPERSAND_NOT_FOLLOWED_BY_VAR_OR_VARARG',
  [T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG]: 'T_AMPERSAND_FOLLOWED_BY_VAR_OR_VARARG',
  [T_READONLY]: 'T_READONLY',
  [T_PROPERTY_C]: 'T_PROPERTY_C',
  [T_PUBLIC_SET]: 'T_PUBLIC_SET',
  [T_PROTECTED_SET]: 'T_PROTECTED_SET',
  [T_PRIVATE_SET]: 'T_PRIVATE_SET',
  [T_PIPE]: 'T_PIPE',
  [T_VOID_CAST]: 'T_VOID_CAST',
  [T_INC]: 'T_INC',
  [T_DEC]: 'T_DEC',
};

export function tokenName(id: number): string {
  if (id < 256) {
    return String.fromCharCode(id);
  }
  return tokenNames[id] ?? 'UNKNOWN';
}

// Keyword map for the lexer
export const keywords: Record<string, number> = {
  'include': T_INCLUDE,
  'include_once': T_INCLUDE_ONCE,
  'eval': T_EVAL,
  'require': T_REQUIRE,
  'require_once': T_REQUIRE_ONCE,
  'or': T_LOGICAL_OR,
  'xor': T_LOGICAL_XOR,
  'and': T_LOGICAL_AND,
  'print': T_PRINT,
  'yield': T_YIELD,
  'instanceof': T_INSTANCEOF,
  'new': T_NEW,
  'clone': T_CLONE,
  'exit': T_EXIT,
  'die': T_EXIT,
  'if': T_IF,
  'elseif': T_ELSEIF,
  'else': T_ELSE,
  'endif': T_ENDIF,
  'echo': T_ECHO,
  'do': T_DO,
  'while': T_WHILE,
  'endwhile': T_ENDWHILE,
  'for': T_FOR,
  'endfor': T_ENDFOR,
  'foreach': T_FOREACH,
  'endforeach': T_ENDFOREACH,
  'declare': T_DECLARE,
  'enddeclare': T_ENDDECLARE,
  'as': T_AS,
  'switch': T_SWITCH,
  'endswitch': T_ENDSWITCH,
  'case': T_CASE,
  'default': T_DEFAULT,
  'break': T_BREAK,
  'continue': T_CONTINUE,
  'goto': T_GOTO,
  'function': T_FUNCTION,
  'fn': T_FN,
  'const': T_CONST,
  'return': T_RETURN,
  'try': T_TRY,
  'catch': T_CATCH,
  'finally': T_FINALLY,
  'throw': T_THROW,
  'use': T_USE,
  'insteadof': T_INSTEADOF,
  'global': T_GLOBAL,
  'static': T_STATIC,
  'abstract': T_ABSTRACT,
  'final': T_FINAL,
  'private': T_PRIVATE,
  'protected': T_PROTECTED,
  'public': T_PUBLIC,
  'var': T_VAR,
  'unset': T_UNSET,
  'isset': T_ISSET,
  'empty': T_EMPTY,
  '__halt_compiler': T_HALT_COMPILER,
  'class': T_CLASS,
  'trait': T_TRAIT,
  'interface': T_INTERFACE,
  'extends': T_EXTENDS,
  'implements': T_IMPLEMENTS,
  'list': T_LIST,
  'array': T_ARRAY,
  'callable': T_CALLABLE,
  '__line__': T_LINE,
  '__file__': T_FILE,
  '__dir__': T_DIR,
  '__class__': T_CLASS_C,
  '__trait__': T_TRAIT_C,
  '__method__': T_METHOD_C,
  '__function__': T_FUNC_C,
  '__namespace__': T_NS_C,
  'namespace': T_NAMESPACE,
  'match': T_MATCH,
  'enum': T_ENUM,
  'readonly': T_READONLY,
  '__property__': T_PROPERTY_C,
};

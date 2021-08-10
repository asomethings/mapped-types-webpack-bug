import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Expose, plainToClass, Type } from "class-transformer";
import "reflect-metadata";

export class ClassOne {
  @ApiProperty()
  @Expose()
  foo: string;

  @ApiProperty()
  @Expose()
  @Type(() => Number)
  bar: number;
}

const classOne = plainToClass(ClassOne, { foo: "str", bar: "1" });
console.log(classOne);

export class ClassTwo extends ClassOne {
  @ApiProperty()
  @Expose()
  baz?: string;
}

const classTwo = plainToClass(ClassTwo, { foo: "str", bar: "1" });
console.log(classTwo);

export class ClassThree extends OmitType(ClassTwo, ["baz"]) {
  @ApiProperty()
  @Expose()
  qux?: string;
}

const classThree = plainToClass(
  ClassThree,
  { foo: "str", bar: "1", qux: "string" },
  { excludeExtraneousValues: true }
);
console.log(classThree.foo, classThree.bar, classThree.qux);
// Expected: str, 1, string
// Prints: undefined, undefined, string

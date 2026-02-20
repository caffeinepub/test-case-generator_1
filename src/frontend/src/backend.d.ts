import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TestCase {
    id: bigint;
    expectedResults: Array<string>;
    type: string;
    preconditions: Array<string>;
    description: string;
    steps: Array<string>;
}
export interface TestSuite {
    exploratory: Array<TestCase>;
    boundary: Array<TestCase>;
    negative: Array<TestCase>;
    edgeCases: Array<TestCase>;
    positive: Array<TestCase>;
    functional: Array<TestCase>;
    orderedSequence: Array<TestCase>;
}
export interface backendInterface {
    getTestSuite(requirements: Array<string>): Promise<TestSuite>;
}

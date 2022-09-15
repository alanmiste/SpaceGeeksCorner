export type MockupResponse = {
    code: number,
    result: MockupResult,
    extra: string[],
}

type MockupResult = {
    task_key: string,
    status: string,
    mockups: MockupResultMockups[],
    printfiles: MockupResultPrintfiles[],
}

type MockupResultMockups = {
    placement: string,
    variant_ids: number[],
    mockup_url: string,
    extra: MockupResultMockupsExtra[],
}

type MockupResultPrintfiles = {
    variant_ids: number[],
    placement: string,
    url: string,
}

type MockupResultMockupsExtra = {
    title: string,
    option: string,
    option_group: string,
    url: string,
}

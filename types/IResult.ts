export interface IResult {
    statusCode?: number;
    code: number;
    data: any,
    message?: string;
    statusMessage?: string;
}

export interface IPage extends IResult {
    data: {
        list: any[],
        total: number
    }
}

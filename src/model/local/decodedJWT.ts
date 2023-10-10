export interface DecodedJWT {
    header: JWTHeader,
    payload: JWTPayload,
    signature: string,
}

export interface JWTHeader {
    alg: string,
    typ: string,
    [key: string]: any;
}

export interface JWTPayload {
    id: string,
    email: string,
    [key: string]: any;
}
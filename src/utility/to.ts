export function to<T>(promise: PromiseLike<T>): PromiseLike<{ error: any, t: T }> {
    return promise.then((data: T) => {
        return { error: null, t: data };
    }, (err) => {
        return { error: err, t: null };
    });
}


export default async function toAsync<T>(promise: PromiseLike<T>): Promise<{ error: any, t: T }> {
    try {
        const t: T = await promise;
        return { error: null, t: t };
    } catch (e) {
        return { error: e, t: null };
    }
}
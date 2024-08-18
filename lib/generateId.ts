export function generateId(): number {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);
    return timestamp + randomPart;
}

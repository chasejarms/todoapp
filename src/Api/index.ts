const randomTexts = [
    'hello',
    'goodbye',
    'what up',
    'why not',
    'here we go',
    'what it is',
]

export const Api = {
    getRandomText: (): Promise<string> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * randomTexts.length);
                const randomText = randomTexts[randomIndex];
                resolve(randomText);
            }, 2000);
        })
    }
}
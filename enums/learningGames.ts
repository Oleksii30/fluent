export type LearningGameType = {
    ID: number,
    NAME: string,
    ROUTE: string,
    DESCRIPTION: string
}

export const LearningGames: Array<LearningGameType> = [
    {
        ID: 1,
        NAME: 'Drag and drop',
        ROUTE: 'drag',
        DESCRIPTION: 'Drag correct translations and synonyms to word boxes'
    },
    {
        ID: 2,
        NAME: 'Translation cards',
        ROUTE: 'translationcards',
        DESCRIPTION: 'Having only translation, write correct word to the box'
    }
]

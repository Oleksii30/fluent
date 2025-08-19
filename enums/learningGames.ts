export type LearningGameType = {
    NAME: string,
    ROUTE: string,
    DESCRIPTION: string
}

export const LearningGames: Array<LearningGameType> = [
    {
        NAME: 'Drag and drop',
        ROUTE: 'drag',
        DESCRIPTION: 'Drag correct translations and synonyms to word boxes'
    },
    {
        NAME: 'Translation cards',
        ROUTE: 'translationcards',
        DESCRIPTION: 'Having only translation, write correct word to the box'
    }
]

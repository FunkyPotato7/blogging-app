import * as Yup from 'yup';

const creteFeedSchema = Yup.object().shape({
    title: Yup.string()
        .max(36, "'Title' must be not greater than 36 chars"),
    body: Yup.string()
        .max(1000, "'Message' must be not greater than 1000 chars")
})

export {
    creteFeedSchema,
}
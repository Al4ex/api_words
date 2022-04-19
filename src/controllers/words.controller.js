import createError from 'http-errors';
import Word from '../models/words';
import Joi from 'joi'

const schema = Joi.object().keys({
    word: Joi.string()
        .required()
        .messages({
            'string.empty': 'El campo word esta vacio',
            'string.required': 'El campo word es requerido',
            'string.base': 'Word debe ser un string',
        })
    ,
    allow: Joi.boolean()
        .required()
        .messages({
            'boolean.empty': 'El campo allow esta vacio',
            'boolean.required': 'El campo allow es requerido',
            'boolean.base': 'allow debe ser un boolean',
            'any.required': `"a" is a required field`
        })
})

const getWords = async (req, res, next) => {

    try {
        const words = await Word.find({ status: "active" });
        res.json(words);
        if (!words) {
            throw createError(404, 'No se encontraron palabras')
        }
    } catch (error) {
        res.status(500).json({
            status: error.status,
            name: error.message,
            message: "Un error ha ocurrido",
            customMessage: "Error en el servidor"
        })
    }
}

const getWord = async (req, res) => {
    try {

        const word = await Word.findById(req.params.id);
        res.json(word);
        if (!word) {
            throw new Error(`Word not found`)
        }
    } catch (error) {
        res.status(404).json({
            status: 404,
            name: "Not Found",
            message: 'Word not found',
            customMessage: "Palabra no encontrada"
        })
    }
}

const createWord = async (req, res) => {


    if (schema.validate(req.body).error) {
        res.status(400).json({
            status: 400,
            name: "Not Found",
            "message": "not found",
            "customMessage": schema.validate(req.body).error.details[0].message
        })
    } else {
        try {

            const word = new Word(req.body);
            const result = await Word.create(word);
            const obj = result.toObject();
            delete obj.status;
            res.json(obj);
        } catch (error) {
            res.status(500).json({
                status: 500,
                name: "Internal Server Error",
                "message": "Internal Server Error",
                "customMessage": "Hubo ub error al crear la palabra"
            })
        }
    }

}

const updateWord = async (req, res) => {
    if (schema.validate(req.body).error) {
        res.status(400).json({
            status: 400,
            name: "Not Found",
            "message": "not found",
            "customMessage": schema.validate(req.body).error.details[0].message
        })
    } else {
        try {
            const word = await Word.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            const obj = word.toObject();
            delete obj.dateCreated;
            res.json(obj);
        } catch (error) {
            res.status(500).json({
                status: 500,
                name: "Internal Server Error",
                "message": "Internal Server Error",
                "customMessage": "Hubo ub error al editar la palabra"
            })
        }
    }


}


const deleteWord = async (req, res) => {
    try {
        const word = await Word.findOneAndUpdate({ _id: req.params.id }, { status: "deleted" }, { new: true });

        res.json(
            {
                "status": 200,
                "message":  `word ${word.word} deleted` ,
                "customMessage": `la palabra o frase ${word.word} fue eliminada`
            }
        );
    } catch (error) {
        res.status(500).json({
            status: 500,
            name: "Internal Server Error",
            "message": "Internal Server Error",
            "customMessage": "Hubo ub error al editar la palabra"
        })

    }
}

export { getWords, getWord, createWord, updateWord, deleteWord };
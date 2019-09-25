const Response = require('../utils/responser');

class Base {

    /**
     *
     * @param Model
     */
    constructor(Model) {
        this.Model = Model;
    }

    /**
     * Create Resource
     * @param req
     * @param res
     */
    static create(req, res) {
        let input = req.body;
        this.Model
            .create(input)
            .then(result => {
                return Response.create(res, 0, result);
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

    /**
     * Get all of resources
     * @param req
     * @param res
     */
    static getAll(req, res) {
        this.Model
            .findAll()
            .then(items => {
                return Response.create(res, 0, items);
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

    /**
     * Get a resource by ID
     * @param req
     * @param res
     */
    static getById(req, res) {
        this.Model
            .findByPk(req.params.id)
            .then(item => {
                return Responser.create(res, 0, item);
            })
            .catch(err => {
                return Responser.create(res, -1, err);
            });
    }

    /**
     * Delete a resource by ID
     * @param req
     * @param res
     */
    static deleteById(req, res) {
        this.Model
            .destroy({where: {id: req.params.id}})
            .then(item => {
                let responseCode = 0;

                if (item === 0) {
                    responseCode = -2;
                }

                return Responser.create(res, responseCode, []);
            })
            .catch(err => {
                return Responser.create(res, -1, err);
            });
    }

}
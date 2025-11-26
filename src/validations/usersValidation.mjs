export const createUserValSchema = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMesage: 'Name must be 3 to 10 symbols',
        },
        notEmpty: true,
        isString: true,
    },
};

module.exports = {
    async up (queryInterface, DataTypes) {
        return queryInterface.createTable('Responsavel', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            grupoPais: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('Responsavel')
    }
}

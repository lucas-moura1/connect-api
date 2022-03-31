module.exports = {
    async up (queryInterface, DataTypes) {
        return queryInterface.createTable('connectCulto', {
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            connectId: {
                type: DataTypes.INTEGER,
                references: { model: 'connect', key: 'id' }
            },
            cultoId: {
                type: DataTypes.INTEGER,
                references: { model: 'culto', key: 'id' }
            },
            numeroPulseira: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            observacoes: {
                type: DataTypes.STRING,
                allowNull: true
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('connectCulto')
    }
}

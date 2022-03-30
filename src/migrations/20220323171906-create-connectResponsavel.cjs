module.exports = {
    async up (queryInterface, DataTypes) {
        return queryInterface.createTable('connectResponsavel', {
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            connectId: {
                type: DataTypes.INTEGER,
                references: { model: 'connect', key: 'id' }
            },
            responsavelId: {
                type: DataTypes.INTEGER,
                references: { model: 'responsavel', key: 'id' }
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('connectResponsavel')
    }
}

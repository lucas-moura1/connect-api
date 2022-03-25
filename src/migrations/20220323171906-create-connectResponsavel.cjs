module.exports = {
    async up (queryInterface, DataTypes) {
        return queryInterface.createTable('ConnectResponsavel', {
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            ConnectId: {
                type: DataTypes.INTEGER,
                references: { model: 'Connect', key: 'id' }
            },
            ResponsavelId: {
                type: DataTypes.INTEGER,
                references: { model: 'Responsavel', key: 'id' }
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('ConnectResponsavel')
    }
}

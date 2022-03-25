module.exports = {
    async up (queryInterface, DataTypes) {
        return queryInterface.createTable('ConnectCulto', {
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            ConnectId: {
                type: DataTypes.INTEGER,
                references: { model: 'Connect', key: 'id' }
            },
            CultoId: {
                type: DataTypes.INTEGER,
                references: { model: 'Culto', key: 'id' }
            },
            numeroPulseira: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('ConnectCulto')
    }
}

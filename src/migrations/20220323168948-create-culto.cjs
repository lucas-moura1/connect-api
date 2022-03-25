module.exports = {
    async up (queryInterface, DataTypes) {
        return queryInterface.createTable('Culto', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            data: {
                type: DataTypes.STRING,
                allowNull: false
            },
            horario: {
                type: DataTypes.ENUM('10h', '18h', '20h'),
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
        return queryInterface.dropTable('Culto')
    }
}

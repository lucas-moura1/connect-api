module.exports = {
    async up (queryInterface, DataTypes) {
        return [
            queryInterface.changeColumn('connect', 'dataNascimento', {
                type: DataTypes.DATEONLY
            }),
            queryInterface.changeColumn('connect', 'telefone', {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }),
            queryInterface.changeColumn('culto', 'data', {
                type: DataTypes.DATEONLY
            })
        ]
    },

    async down (queryInterface, DataTypes) {
        return [
            queryInterface.changeColumn('connect', 'dataNascimento', {
                type: DataTypes.STRING
            }),
            queryInterface.changeColumn('connect', 'telefone', {
                type: DataTypes.STRING,
                allowNull: false
            }),
            queryInterface.changeColumn('culto', 'data', {
                type: DataTypes.STRING
            })
        ]
    }
}

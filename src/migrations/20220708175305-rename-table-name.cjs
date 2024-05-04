module.exports = {
    async up (queryInterface) {
        return Promise.all([
            queryInterface.renameTable('connectCulto', 'connect_culto'),
            queryInterface.renameTable('connectResponsavel', 'connect_responsavel')
        ])
    },

    async down (queryInterface) {
        return Promise.all([
            queryInterface.renameTable('connect_culto', 'connectCulto'),
            queryInterface.renameTable('connect_responsavel', 'connectResponsavel')
        ])
    }
}

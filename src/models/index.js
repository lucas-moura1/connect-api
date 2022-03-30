import Responsavel from './Responsable.js'
import Connect from './Connect.js'
import Culto from './Cult.js'
import ConnectCulto from './ConnectCult.js'

Connect.belongsToMany(Responsavel,
    { through: 'connectResponsavel' }
)
Responsavel.belongsToMany(Connect,
    { through: 'connectResponsavel' }
)

Culto.belongsToMany(Connect,
    { through: ConnectCulto }
)
Connect.belongsToMany(Culto,
    { through: ConnectCulto }
)

export { Connect, Responsavel, Culto, ConnectCulto }

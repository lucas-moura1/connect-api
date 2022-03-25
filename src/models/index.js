import Responsavel from './Responsable.js'
import Connect from './Connect.js'
import Culto from './Cult.js'
import ConnectCulto from './ConnectCult.js'

Connect.belongsToMany(Responsavel,
    { through: 'ConnectResponsavel' }
)
Responsavel.belongsToMany(Connect,
    { through: 'ConnectResponsavel' }
)

Culto.belongsToMany(Connect,
    { through: ConnectCulto }
)
Connect.belongsToMany(Culto,
    { through: ConnectCulto }
)

export { Connect, Responsavel, Culto, ConnectCulto }

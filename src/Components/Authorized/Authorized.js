const Authorized = ({ currentRole, children, authority, noMatch }) => {
    if (!authority) return children
    const _authority = Array.isArray(authority) ? authority : [authority]
    if (_authority.includes(currentRole)) return children
    return noMatch
}
export default Authorized

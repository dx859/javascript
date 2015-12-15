# React.js Tutorials From TouTube

The V in MVC

The Virtual DOM
    The DOM is EXPENSIVE to update
    Lightweight DOM representation
    Pure render function:
        f(d) = v
        f(d') = v'
        diff(v, v') = changes
        diff(v', v) = undo

State and Props
    props are immutable
    passed in by parent component
    e.g. className or isExpanded

    state is internal
    should be kept to a minimum
    managed by a common ancestor

    getInitialState()
    setState()
    forceUpdate()
    shouldComponentRender()

Syntax
    JavaScript : 
        React.renderComponent(
            React.DOM.h1(null, 'Hello, world!'),
            document.getElementById('example')
        )
    
    JSX :
        React.renderComponent(
            <h1>Hello, world!</h1>
            document.getElementById('example')
        )

    LiveScript
        react.render-component do
            h1 null 'Hello, world!'
            document.get-element-by-id 'example'

Lifecycle
    componentWillMount()
    componentDidMount()
    componentWillReceviveProps(object nextProps)
    shouldComponentUpdate(object nextProps, object nextState)
    componentWillUpdate(object nextProps, object nextState)
    componentDidUpdate(object prevProps, object prevState)
    componentWillUnmount()

Date flow
    From parent to child via props
    Like one-way data binding
    Psss callbacks for interactions that modify parent state
    Like two-way data binding
    Synthetic event system

Flux
    Action -> Dispatcher -> Store -> View
                ↑                     |
                | ----   Action   ----|

Isomorphic applications
    renderComponentToString()
    checksum
    carry on client-side
    refresh any route
    non-JavaScript for free
    fast start up
    SEO friendly (no need for PhantomJS)
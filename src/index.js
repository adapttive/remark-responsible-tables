const visit = require("unist-util-visit");

const DEFAULT_SETTINGS = {
    classnames: {
        table: "rwd-table",
        row: "rwd-table-row",
        column: "rwd-table-column",
        wrapper: "rwd-table-wrapper"
    },
    addWrapper: true
}

module.exports = responsiveTables;

function responsiveTables(options) {
    const {classnames, addWrapper} = Object.assign({}, DEFAULT_SETTINGS, options);

    return function transformer(tree) {
        let headers;
        visit(tree, "tableRow", visitor);

        function visitor(node, index, parent) {
            if (node.type === "tableRow" && index === 0) {
                // thead
                headers = node.children.map(header => typeof header.children[0] !== 'undefined' ? header.children[0].value : '');
            }

            // tbody rows
            if (index !== 0) {
                let additional = "odd";
                if (index % 2 === 0) {
                    additional = "even";
                }
                let data = {};
                if (node.data) {
                    data = node.data;
                }
                node.data = Object.assign({}, {
                    hProperties: {
                        dataTh: headers[index],
                        className: classnames.row + " " + additional
                    }
                }, data)

                node.children.map(
                    (child, index) => {
                        let data = {};
                        if (child.data) {
                            data = child.data;
                        }
                        child.data = Object.assign({}, {
                            hProperties: {
                                dataTh: headers[index],
                                className: classnames.column
                            }
                        }, data)
                        return child;
                    }
                )
            }
        }

        visit(tree, "table", visitorTable);

        function visitorTable(node, index, parent) {
            let data = {};
            if (node.data) {
                data = node.data;
            }
            node.data = Object.assign({}, {
                hProperties: {
                    className: classnames.table
                }
            }, data)

            if (addWrapper) {
                parent.children[index] = {
                    type: 'container',
                    children: [
                        node
                    ],
                    data: {
                        hName: 'div',
                        hProperties: {
                            className: classnames.wrapper
                        },
                    },
                }
            }
        }
    }
}

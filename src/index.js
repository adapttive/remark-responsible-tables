const visit = require("unist-util-visit");
const DEFAULT_SETTINGS = {
    classnames: {
        table: "rwd-table",
        row: "rwd-row"
    }
}

module.exports = responsiveTables;

function responsiveTables(options) {
    const {classnames} = Object.assign({}, DEFAULT_SETTINGS, options);

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
                node.children.map(
                    (child, index) => {
                      let data = {};
                      if (child.data) {
                        data = child.data;
                      }
                      child.data = Object.assign({}, {
                        hProperties: {
                          dataTh: headers[index],
                          className: classnames.row
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
            data = child.data;
          }
          node.data = Object.assign({}, {
            hProperties: {
              className: classnames.table
            }
          }, data)
        }
    }
}

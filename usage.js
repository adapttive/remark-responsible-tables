const remark = require("remark");
const html = require('remark-html')
const gfm = require('remark-gfm')
const responsiveTables = require('./src/index')

const table =
    "# Table \n" +
    "| First Header  | Second Header |\n" +
    "| ------------- | ------------- |\n" +
    "| Content Cell 1  | Content Cell 2  |\n" +
    "| Content Cell 3 | Content Cell 4 |\n";

remark()
    .use(html)
    .use(gfm)
    .use(responsiveTables)
    .process(
        table,
         function(err, output) {
        console.log(String(output))
        console.error(err)
        }
    );
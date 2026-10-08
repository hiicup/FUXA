var svgedit = svgedit || {};

(function () {
    'use strict';

    if (!svgedit.shapes) {
        svgedit.shapes = {};
    }

    // Add here the your shapes file name 
    // 注意：proc-pumps-shapes.js / proc-comp-shapes.js 里的图元名与 proc-shapes.js 完全同名
    // （已逐条比对，几何一致）。它们不新增符号，只是把同一批泵 / 压缩机符号在左侧面板里
    // 再单独分一组，方便查找。落图时编辑器按 name 在 shapesList 里取第一个命中
    // （ext-bundle.min.js 的 window.extShapes -> shapesList.find），因几何相同，结果一致。
    // proc-general-shapes.js 未启用：其 10 个图元全部与 proc-shapes.js 重名，且原文件缺 typeId
    // 声明（第 51 行会抛 ReferenceError），启用它没有任何新增内容。
    var shapesToLoad = ['my-shapes.js', 'proc-shapes.js', 'ape-shapes.js',
                        'proc-pumps-shapes.js', 'proc-comp-shapes.js'];

    svgedit.shapes.load = function (path, callback) {
        var progress = 0;
        $.each(shapesToLoad, function() {
            var name = this;
            $.getScript(curConfig.shapesPath + name, function(d) {
                if (++progress == shapesToLoad.length) {
                    callback();
                }
            }).fail(function(){
                console.log('ERROR: loading ' + curConfig.shapesPath + name);
                if (++progress == shapesToLoad.length) {
                    callback();
                }
            });
        });
        return true;
    };
}());

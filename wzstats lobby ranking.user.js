// ==UserScript==
// @name         wzstats lobby ranking
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A script that enables lobby ranking (bronze, silver etc.) like at sbmmwarzone.com
// @author       alshuriga
// @match        *://wzstats.gg/*
// @grant        none
// @icon         https://github.com/alshuriga/wzstats-lobby-ranking/raw/main/icon.png
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==


var db = [
    ['MASTER', 95, 99, 3.57, 100, 'linear-gradient(110deg, rgb(56, 87, 231) 0%, rgb(211, 34, 8) 50%, rgb(253, 160, 0) 100%);'],
    ['LEGEND', 95, 99, 2.08, 3.57, 'linear-gradient(110deg, rgb(59, 28, 126) 0%, rgb(130, 51, 197) 50%, rgb(233, 99, 253) 100%);'],
    ['DIAMOND 1', 95, 99, 1.54, 2.08, 'rgb(46, 202, 202)'],
    ['DIAMOND 2', 90, 95, 1.34, 1.54, 'rgb(46, 202, 202)'],
    ['DIAMOND 3', 85, 90, 1.23, 1.34, 'rgb(46, 202, 202)'],
    ['DIAMOND 4', 80, 85, 1.14, 1.23, 'rgb(46, 202, 202)'],
    ['PLATINUM 1', 75, 80, 1.08, 1.14, 'rgb(80, 129, 160)'],
    ['PLATINUM 2', 70, 75, 1.02, 1.08, 'rgb(80, 129, 160)'],
    ['PLATINUM 3', 65, 70, 0.97, 1.02, 'rgb(80, 129, 160)'],
    ['PLATINUM 4', 60, 65, 0.92, 0.97, 'rgb(80, 129, 160)'],
    ['GOLD 1', 55, 60, 0.87, 0.92, 'rgb(228, 164, 0)'],
    ['GOLD 2', 50, 55, 0.83, 0.87, 'rgb(228, 164, 0)'],
    ['GOLD 3', 45, 50, 0.78, 0.83, 'rgb(228, 164, 0)'],
    ['GOLD 4', 40, 45, 0.74, 0.78, 'rgb(228, 164, 0)'],
    ['SILVER 1', 35, 40, 0.69, 0.74, 'rgb(160, 175, 184)'],
    ['SILVER 2', 30, 35, 0.64, 0.69, 'rgb(160, 175, 184)'],
    ['SILVER 3', 25, 30, 0.59, 0.64, 'rgb(160, 175, 184)'],
    ['SILVER 4', 20, 25, 0.53, 0.59, 'rgb(160, 175, 184)'],
    ['BRONZE 1', 15, 20, 0.47, 0.53, 'rgb(190, 111, 38)'],
    ['BRONZE 2', 10, 15, 0.38, 0.47, 'rgb(190, 111, 38)'],
    ['BRONZE 3', 5, 1, 0.26, 0.38, 'rgb(190, 111, 38)'],
    ['BRONZE 4', 0, 5, 0, 0.26, 'rgb(190, 111, 38)']
]

function detect(kd) {
    if (kd == '') {
        return [0, 'hsla(0,0%,100%,.2)'];
    }
    for (var i = 0; i < db.length; i++) {
        if (kd >= db[i][3] && kd < db[i][4]) {
            return [db[i][0], db[i][5]];
        }
    }
    return [0, 0];
}


$(document).ready(function() {
    waitForKeyElements(".match-league, .lobby-stat.highlighted", main);
    $(document).click(function() {
        waitForKeyElements(".match-league, .lobby-stat.highlighted", main);
    });
});


function main() {
    var elements = $(".match-league");
    elements.each(function() {
        var kd = $('> .league-value', this).first().text()
        var league = detect(kd)[0];
        var color = detect(kd)[1];
        $('> .league-title', this).first().text(league);
        $('> .league-title', this).first().css('color', 'hsla(0,0%,100%,.8)');
        $(this).css('background', color);

    });

    var single = $(".lobby-stat.highlighted").first();
    var skd = $('.stat-number').first().text();
    var league = detect(skd)[0];
    var color = detect(skd)[1];
    $('.stat-title').first().text(league);
    $('.stat-title').first().css('opacity', '0.8');
    $('.lobby-stat.highlighted').css('background', color);

}
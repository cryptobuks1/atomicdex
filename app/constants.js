'use strict';
const {is} = require('electron-util');

exports.websiteUrl = 'https://hyperdex.app';

exports.repoUrl = 'https://github.com/atomiclabs/hyperdex';

exports.minWindowSize = {
	width: 1060,
	height: is.macos ? 600 : 650,
};

exports.loginWindowSize = {
	width: 330,
	height: is.macos ? 500 : 550,
};

exports.appViews = [
	'Dashboard',
	// 'Swap',
	'Home',
	'Exchange',
	'Trades',
	'Settings',
];

exports.defaultEnabledCurrencies = [
	// 'BCH',
	'BTC',
	// 'CHIPS',
	// 'DASH',
	// 'DOGE',
	// 'HUSH',
	// 'KMD',
	'LTC',
	// 'MORTY',
	// 'MSHARK',
	// 'MYTH',
	// 'OOT',
	// 'REVS',
	// 'RICK',
	// 'SUPERNET',
	// 'VTC',
	// 'ZEC',
];

exports.alwaysEnabledCurrencies = [
	// 'KMD',
	// 'CHIPS',
];

exports.ignoreExternalPrice = new Set([
	'CALL',
	'MORTY',
	'REVS',
	'RICK',
	'SUPERNET',
]);

exports.hiddenCurrencies = [];

exports.appTimeStarted = Date.now();

exports.supportedLanguagesWithNames = new Map([
	['ar', 'Arabic'],
	['bn', 'Bengali'],
	['de', 'German'],
	['en-US', 'English'],
	['es-ES', 'Spanish'],
	['fa', 'Persian'],
	['fr', 'French'],
	['hi', 'Hindi'],
	['id', 'Indonesian'],
	['it', 'Italian'],
	['ja', 'Japanese'],
	['ko', 'Korean'],
	['nb', 'Norwegian Bokmål'],
	['pl', 'Polish'],
	['ru', 'Russian'],
	['sv-SE', 'Swedish'],
	['sw', 'Swahili'],
	['th', 'Thai'],
	['tr', 'Turkish'],
	['ur-PK', 'Urdu (Pakistan)'],
	['vi', 'Vietnamese'],
	['zh-CN', 'Simplified Chinese'],
	['zh-TW', 'Traditional Chinese'],
]);

exports.supportedLanguages = [...exports.supportedLanguagesWithNames.keys()];

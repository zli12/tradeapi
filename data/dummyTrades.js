db.trades.insert([
{
	symbol: 'IBM',
	action: 'BUY',
	amount: 1000,
	manager: 'ZLI',
	trader: 'TT',
	custodian: 'BOFA',
	strategy: 'ABC'
},{
	symbol: 'IBM',
	action: 'BUY',
	amount: 1500,
	manager: 'TM',
	trader: 'TT',
	custodian: 'MSCO',
	strategy: 'ABC'
},{
	symbol: 'MSFT',
	action: 'BUY',
	amount: 2000,
	manager: 'TM2',
	trader: 'T1',
	custodian: 'MSCO',
	strategy: 'DEF'
},{
	symbol: 'MSFT',
	action: 'SELL',
	amount: 500,
	manager: 'ZLI',
	trader: 'T1',
	custodian: 'GSCO',
	strategy: 'DEF'
},{
	symbol: 'GOOG',
	action: 'SHORT',
	amount: 2500,
	manager: 'WZ',
	trader: 'T2',
	custodian: 'APP',
	strategy: 'XYZ'
},{
	symbol: 'BBY',
	action: 'COVER',
	amount: 1500,
	manager: 'WZ',
	trader: 'T2',
	custodian: 'BOFA',
	strategy: 'XYZ'
},{
	symbol: 'BBY',
	action: 'BUY',
	amount: 3500,
	manager: 'WZ',
	trader: 'T1',
	custodian: 'GSCO',
	strategy: 'XYZ'
}
])

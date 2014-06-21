Ext.define('MyApp.view.home.HomeChart', {
    extend: 'Ext.Container',
    xtype: 'home_homechart',
    requires: [
    	'MyApp.store.Trades'
    ],
	config: {
		recordData: null,
		data: {
			'labels': ["1","5","10","15","20","31"],
			'incomes': [1600,1600,1600,1900,1900,1900],
			'expenses':[0,100,300,700,1000,1600],
			'target': [1000,1000,1000,1000,1000,1000]
			//'bad_cholesterol': [2,3,1,5]
		},
		minHeight: 170
        //html:'<canvas id="home_chart_canvas_id" width="310" height="170"></canvas>',
		//height: 220
     },
     initialize:function(){
	 	this.callParent(arguments);	
     	var me = this;
     	me._currentDate = new Date();
     	Ext.defer(function() {
     		me._screenWidth = me.element.dom.offsetWidth;
	     	me._screenHeight = me.element.dom.offsetHeight;
	     	if (me._screenHeight < 170)
	     		me._screenHeight = 170;
	     	
	     	//fix duplicate canvas on Android webview
	     	//var html = '<div style="position:relative; overflow-y:scroll;"><canvas id="home_chart_canvas_id" width="{0}" height="{1}"></canvas></div>';
	     	
	     	var html = '<canvas id="home_chart_canvas_id" width="{0}" height="{1}"></canvas>';
	     	//if (AppUtil.RELEASE) html = '<div style="position:relative; overflow-y:scroll;"><canvas id="home_chart_canvas_id" width="{0}" height="{1}"></canvas></div>';
	     	html = Ext.util.Format.format(html, me._screenWidth, me._screenHeight);
	     	me.setHtml(html);
	     	me._options = {
	     		selectedDate: new Date(),
				//Boolean - Whether the line is curved between points
				scaleOverlay : false,	
				//Boolean - If we want to override with a hard coded scale
				scaleOverride : true,			
				//** Required if scaleOverride is true **
				//Number - The number of steps in a hard coded scale
				scaleSteps : 10,
				//Number - The value jump in the hard coded scale
				scaleStepWidth : 2000000,
				//Number - The scale starting value
				scaleStartValue : 0,
				//scaleShowLabels : true,
				scaleShowGridLines : true,
				scaleLabel : "<%=value%>",
				pointDot: false,
				datasetFill : false,
				datasetStrokeWidth : 4,
				bezierCurve : false,
				animation : false,
				pointDotRadius : 3,
				scaleFontColor: "#a7a8aa",
				pointDotStrokeWidth : .5,
				scaleLineWidth: .5,
				scaleGridLineWidth : .5,
				scaleGridLineColor :  "rgba(242,242,242,1)",
				scaleGridXLineColor :  "rgba(214,214,214,1)",

				scaleLineColor : "rgba(203,204,205,1)",
				scaleFontFamily : 'ROBOTO-LIGHT',
				scaleFontSize : 8,
				scaleXFontSize: 8,
				passedFontColor: "#999da0",
				futureFontColor: "#e0e0e0",
				todayBgColor: "#fff",
				todayBarFillColor: "rgba(57,192,231,.15)",
				weekendFillColor: "rgba(248,248,248,.8)"
			};
			
			Ext.defer(function() {
				if (!me._canvas) me._canvas = document.getElementById("home_chart_canvas_id");
				if (!me._context) me._context = me._canvas.getContext("2d");
				me.showChart(me._currentDate);
			},200);
     	}, 200);
     	
     	
		MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);//from Trade
    },
    
    onTradeAdded: function(date) {
		var me = this;
		if (me._currentDate.sameMonthWith(date)) {
			me.showChart(date);
		}
	},
    
    onDayChanged: function() {
    	var me = this;
    	me.showChart();
    },
	showChart: function(date) {
		//ppUtil.log('showChart');
		var me = this;		
		
		//if (recorddata) me.setRecordData(recorddata);
		setTimeout(function(){
			me.generateDataForCurrentMonth(date);
			//me.checkGetDataDone();
		},100);
	},

	generateDataForCurrentMonth: function(date) {
		var me = this;
		me.getData()['labels'] = [];	
		me.getData()['incomes'] = [];	
		me.getData()['expenses'] = [];
		me.getData()['target'] = [];		
		me.getDataForMonth(date);
		
	},
	getDataForMonth: function(date) {
		var me = this;		
		var daysInMonth = Ext.Date.getDaysInMonth(date);
		var todayDate = daysInMonth;//date.getDate();
		var labels = me.getData()['labels'];
		var incomes = me.getData()['incomes'];
		var expenses = me.getData()['expenses'];
		
		for (var i = 0; i < daysInMonth; i++) {
			labels.push((i+1).toString());
		}
		for (var i = 0; i < todayDate; i++) {
			incomes.push(0);
			expenses.push(0);
		}
		me.getData()['target'].push(0, 500000);	//need 2 values
		
		//get expense of this month
		if (!me._expenseStore) me._expenseStore = Ext.create('MyApp.store.Trades');
		me._expenseStore.changeQuery('Trades_Month', {
				mm : date.getMonth(),
				yy : date.getFullYear()
		});
		me._expenseStore.load(function(records) {
			//AppUtil.log(records);
			
			Ext.Array.each(records, function(item, index) {
				if (item.data.dd <= todayDate) {
					if (item.data.type == 'thu') {
						incomes[item.data.dd-1] += parseInt(item.data.total);
					} else if (item.data.type == 'chi') {
						expenses[item.data.dd-1] += parseInt(item.data.total);
					}
				}			
			});
			var thuTotal = incomes[0];
			var chiTotal = expenses[0];
			for (var i = 1; i < incomes.length; i++) {
				thuTotal += incomes[i];
				incomes[i] = thuTotal;			
			}
			for (var i = 1; i < expenses.length; i++) {			
				chiTotal += expenses[i];
				expenses[i] = chiTotal;
			}
			MyApp.app.fireEvent(AppConfig.eventData.EXPENSE_CHANGED, thuTotal, chiTotal, date);//to HOME
			var max = thuTotal > chiTotal ? thuTotal : chiTotal;
			//AppUtil.log(max);
			if (max <= 100000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 20000;
			} else if (max <= 500000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 100000;
			} else if (max <= 1000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 200000;
			} else if (max <= 5000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 1000000;
			} else if (max <= 10000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 2000000;
			} else if (max <= 15000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 3000000;
			} else if (max <= 20000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 4000000;
			} else if (max <= 25000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 5000000;
			} else if (max <= 30000000) {
				me._options.scaleSteps = 6;
				me._options.scaleStepWidth = 5000000;
			} else if (max <= 35000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 7000000;
			} else if (max <= 40000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 8000000;
			} else if (max <= 45000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 9000000;
			} else if (max <= 50000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 10000000;
			} else if (max <= 55000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 11000000;
			} else if (max <= 60000000) {
				me._options.scaleSteps = 6;
				me._options.scaleStepWidth = 10000000;
			} else if (max <= 65000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 13000000;
			} else if (max <= 70000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 15000000;
			} else if (max <= 80000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 16000000;
			} else if (max <= 100000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth = 20000000;
			} else if (max <= 15000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth =30000000;
			} else if (max <= 200000000) {
				me._options.scaleSteps = 5;
				me._options.scaleStepWidth =40000000;
			}  else me._options.scaleOverride = false;
			me.checkGetDataDone();
		});
		
	},
	
	checkGetDataDone: function() {		
		var me = this;
		var lineChartData = {
			labels : me.getData()['labels'],
			datasets : [				
				{
					strokeColor : "rgba(225,73,73,1)",
					strokeColor2 : "rgba(224,156,149,.5)",
					data : this.getData()['expenses']
				},
				{
					strokeColor : "rgba(1,214,96,1)",
					strokeColor2 : "rgba(128,234,175,.5)",
					data : me.getData()['incomes']
				},
				{
					//fillColor : "rgba(241,155,154,1)",
					strokeColor : "rgba(193,57,43,1)",
					//pointColor : "rgba(255,60,46,1)",
					//pointStrokeColor : "#fff",
					data : this.getData()['target'],
					type: 'target'
				}
			]
			
		};
	
		me._context.save();
		me._context.setTransform(1, 0, 0, 1, 0, 0);
		me._context.clearRect(0, 0, me._screenWidth, me._screenHeight);
		me._context.restore();
		//AppUtil.log(me._canvas);
		//me._canvas.width = me._canvas.width;//remove duplicate canvas on Android
		
		if (!me._chart) {
			me._chart = new Chart(me._context);
		}
		me._chart.Line(lineChartData, me._options);			
	}
});
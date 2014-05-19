Ext.define('MyApp.view.home.HomeChart', {
    extend: 'Ext.Container',
    xtype: 'home_homechart',
    requires: [
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
		minHeight: 190
        //html:'<canvas id="home_chart_canvas_id" width="310" height="170"></canvas>',
		//height: 220
     },
     initialize:function(){
	 	this.callParent(arguments);	
     	var me = this;
     	Ext.defer(function() {
     		me._screenWidth = me.element.dom.offsetWidth;
	     	me._screenHeight = me.element.dom.offsetHeight;
	     	if (me._screenHeight < 190)
	     		me._screenHeight = 190;
	     	
	     	//fix duplicate canvas on Android webview
	     	var html = '<div style="position:relative; overflow-y:scroll;"><canvas id="home_chart_canvas_id" width="{0}" height="{1}"></canvas></div>';
	     	
	     	//var html = '<canvas id="home_chart_canvas_id" width="{0}" height="{1}"></canvas>';
	     	html = Ext.util.Format.format(html, me._screenWidth, me._screenHeight);
	     	me.setHtml(html);
	     	//AppUtil.log(me);
	     	me._options = {
				//Boolean - Whether the line is curved between points
				scaleOverlay : true,	
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
				scaleShowGridLines : false,
				scaleLabel : "<%=value%>",
				pointDot: true,
				bezierCurve : false,
				animation : false,
				pointDotRadius : 3,
				scaleFontColor: "#898d90",
				pointDotStrokeWidth : .5,
				scaleGridLineWidth : .5,
				scaleGridLineColor : "rgba(225,225,225,1)",
				scaleLineColor : "rgba(111,104,95,.6)",
				scaleFontFamily : 'ROBOTO-LIGHT',
				scaleFontColor : "#9e9fa1",
				scaleFontSize : 12,
			};
	
			Ext.defer(function() {
				if (!me._canvas) me._canvas = document.getElementById("home_chart_canvas_id");
				if (!me._context) me._context = me._canvas.getContext("2d");
				me.showChart();
			},500);
     	}, 500);
     	
		//MyApp.app.on('day_changed', me.onDayChanged, me);
		//PatientDiary.app.on('update_progresschart', this.showChart, this);
    },
    
    onDayChanged: function() {
    	var me = this;
    	me.showChart();
    },
	showChart: function() {
		//ppUtil.log('showChart');
		var me = this;		
		
		//if (recorddata) me.setRecordData(recorddata);
		setTimeout(function(){
			me.generateDataForCurrentMonth();
			//me.checkGetDataDone();
		},100);
	},

	generateDataForCurrentMonth: function() {
		var me = this;
		me.getData()['labels'] = [];	
		me.getData()['incomes'] = [];	
		me.getData()['expenses'] = [];
		me.getData()['target'] = [];		
		var today = new Date();
		me.getDataForMonth(today);
		
	},
	getDataForMonth: function(date) {
		var me = this;		
		var daysInMonth = Ext.Date.getDaysInMonth(date);
		var todayDate = date.getDate();
		var labels = me.getData()['labels'];
		var incomes = me.getData()['incomes'];
		var expenses = me.getData()['expenses'];
		
		for (var i = 0; i < daysInMonth; i++) {
			labels.push((i+1).toString());
		}
		for (var i = 0; i < todayDate; i++) {
			if (i == 0 || i == 3 || i == 7 | i == 13) {
				incomes.push(Math.round(Math.random()*3000000));
				expenses.push(Math.round(Math.random()*1000000));
			} else {
				incomes.push(0);
				expenses.push(0);
			}
			
			//me.getData()['target'].push(10000);	
		}
		

			var thuTotal = incomes[0];
			var chiTotal = expenses[0];
			for (var i = 1; i < incomes.length; i++) {
				thuTotal += incomes[i];
				incomes[i] = thuTotal;
				chiTotal += expenses[i];
				expenses[i] = chiTotal;
			}
			MyApp.app.fireEvent('thuchi_changed', thuTotal, chiTotal);
			var max = thuTotal > chiTotal ? thuTotal : chiTotal;
			
			me.getData()['target'].push(max - 1000000);	
			me.getData()['target'].push(max - 1000000);
			//AppUtil.log(max);
			if (max <= 5000000) {
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
			
		/*
		//get expense of this month
		if (!me._monthStore) me._monthStore = new MyApp.store.Expenses_Month();
		me._monthStore.load(function(records) {
			//AppUtil.log(records);
			
			Ext.Array.each(records, function(item, index) {
				if (item.data.dd <= todayDate) {
					if (item.data.type == 'thu' || item.data.type == 'linh_lai' || item.data.type == 'tien_du') {
						incomes[item.data.dd-1] += parseInt(item.data.amount);
					} else if (item.data.type == 'chi') {
						expenses[item.data.dd-1] += parseInt(item.data.amount);
					}
				}			
			});
			var thuTotal = incomes[0];
			var chiTotal = expenses[0];
			for (var i = 1; i < incomes.length; i++) {
				thuTotal += incomes[i];
				incomes[i] = thuTotal;
				chiTotal += expenses[i];
				expenses[i] = chiTotal;
			}
			MyApp.app.fireEvent('thuchi_changed', thuTotal, chiTotal);
			var max = thuTotal > chiTotal ? thuTotal : chiTotal;
			//AppUtil.log(max);
			if (max <= 5000000) {
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
		*/
	},
	
	checkGetDataDone: function() {		
		var me = this;
		//this.getData()['labels'].reverse();
		//this.getData()['value'].reverse();
		//this.getData()['bad_cholesterol'].reverse();
		
		var lineChartData = {
			labels : me.getData()['labels'],
			datasets : [
				{
					fillColor : "rgba(125,176,242,1)",
					strokeColor : "rgba(14,122,255,1)",
					pointColor : "rgba(14,122,255,1)",
					pointStrokeColor : "#fff",
					data : me.getData()['incomes']
				},
				{
					fillColor : "rgba(241,155,154,1)",
					strokeColor : "rgba(255,60,46,1)",
					pointColor : "rgba(255,60,46,1)",
					pointStrokeColor : "#fff",
					data : this.getData()['expenses']
				},
				{
					//fillColor : "rgba(241,155,154,1)",
					strokeColor : "rgba(255,60,46,1)",
					//pointColor : "rgba(255,60,46,1)",
					//pointStrokeColor : "#fff",
					data : this.getData()['target'],
					type: 'target'
				}
			]
			
		};
		//var max = Ext.Array.max(this.getData()['value']);
		//max = parseInt(Math.ceil(max/5))*5;
		//this._options.scaleStartValue = Ext.Array.min(this.getData()['value']);			
		//this._options.scaleSteps = max%5;
		//this._options.scaleStepWidth = max / 5;
		
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
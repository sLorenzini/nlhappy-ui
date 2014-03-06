var delayedFunctionCalls = {};

function declareDelayedFunction(scope, name, timeout, body)
{
	if(!delayedFunctionCalls[scope.$id])
	{
		delayedFunctionCalls[scope.$id] = {};
	}

	scope[name] = function ()
	{
		var message = "Waiting for "+name+"...";
		scope.status.message = message;
		var handle = delayedFunctionCalls[scope.$id][name];
		if (handle)
		{
			window.clearTimeout(handle);
		}

		scope.pushMessage(message);

		delayedFunctionCalls[scope.$id][name] = window.setTimeout(function () {
			scope.status.message = '';
			scope.$apply(function()
			{
				var result = body();
				var ok = !(result === false || (typeof result === "object" && result.success === false));
				scope.clearMessage(message, ok);
			});
		}, timeout);
	};
}

function ignoreFirstCall(callback)
{
	var first = true;
	
	return function()
	{
		if(first)
		{
			console.log("FIRST CALL");
			first = false;
		}
		else
		{
			console.log("SECOND CALL");
			callback();
		}
	};
}
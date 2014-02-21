var delayedFunctionCalls = {};

function declareDelayedFunction(scope, name, timeout, body)
{
	if(!delayedFunctionCalls[scope.$id])
	{
		delayedFunctionCalls[scope.$id] = {};
	}

	scope[name] = function ()
	{
		scope.status.message = "Waiting for "+name+"...";
		var handle = delayedFunctionCalls[scope.$id][name];
		if (handle)
		{
			window.clearTimeout(handle);
		}

		delayedFunctionCalls[scope.$id][name] = window.setTimeout(function () {
			scope.status.message = '';
			scope.$apply(body);
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
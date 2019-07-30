export default function summarize(expenses, people){
	
	  let empty = Object.fromEntries(people.map(p=>[p,0]));
	
		let summary = expenses.reduce((summary, {spender, concerned, amount}) => {
			summary[spender] = (summary[spender]||0) + amount;
			const split = amount / concerned.length;
			concerned.forEach(c => {
				summary[c] = (summary[c]||0) - split;
			});
			return summary;
		}, empty);
	
	return Object.entries(summary)
					.map(([person, balance]) => ({person, balance}))
					.sort(({balance:a}, {balance:b}) => a - b);
} 
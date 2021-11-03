/* 

This shit was coded by Genocide. / genocide#0896 / GEN0C1DE on github.
Simple Nitro Sniper that will run when your computer is fucking on and not idled or off.
This can run on a VPS, you would need knowledge on how to run JS Executables on a Linux Server simple.
This executable uses Eris, a discord library for javascript. It is more suitable for user accounts, than Discord.JS in recent updates.

Coded Specifically for JFIVE, if this project releases, then oh well. I might just fuck around and obfuscate the fuck out of this then.
> Then releases the project for the public because why the fuck not :shrug:
> Enjoy! My contact information is above and below if you need assistance.
> https://discord.gg/suYCGUGCsd <

*/


global.Settings = {
    TokenToLogin: ""
}

class L0V3LYB00T2 {
    Dependencies = {
        Eris: require("eris-additions")(require("eris"), {enabled: ["Channel.sendMessage", "Channel.awaitMessages", "Message.guild", "Channel.sendEmbed", "Eris.Embed", "Member.color", "Member.highestRole", "Member.kickable", "Member.bannable", "Member.hasRole", "Member.hasPermission"]}),
        Request: require("request"),
        Chalk: require("chalk")
    }

    MessageHandler(Message) {
        return this.NitroHandler(Settings.TokenToLogin, Message);
    }
    NitroHandler(Token, Message) {
		var NitroRegex = new RegExp(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)[^\s]+/gim);
		var NitroCodes = Message.content.match(NitroRegex)

        var Eris = this.Dependencies.Eris
        var Request = this.Dependencies.Request
        var Chalk = this.Dependencies.Chalk
		
		var Guild = Message.guild
		if (!Guild) Guild = Message.channel
		
		if (NitroCodes && NitroCodes.length) {
			for (let NitroCode of NitroCodes) {
				NitroCode = NitroCode.replace(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)/gim, '').replace(/\W/g, '');
				console.log(`Found Nitro Code: ${NitroCode} in ${Guild.id}`)
          
				if (NitroCode.length < 16 || NitroCode.length > 24) {
					console.log(Chalk.yellow(`Fake Nitro Code: ${NitroCode} in ${Guild.id}`));
					continue;
				}
           
				Request({
					method: "POST",
					url: `https://discord.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
						'Authorization': Token
					}
				}, (error, body, response) => {
					if (error) return console.log(chalk.red(`Couldn't claim Nitro. Error has occurred!`));
					
					let ParsedJSON = JSON.parse(body.body)
					if (ParsedJSON.message === '401: Unauthorized') {
					  return console.log(Chalk.red(`Couldn't claim Nitro. User token is invalid!`))
					}
					
					if (ParsedJSON.message == 'This gift has been redeemed already.') {
					  return console.log(Chalk.yellow(`Couldn't claim Nitro. Link is expired or it's already claimed!`))
					}
					
					if (ParsedJSON.message == 'Cannot self-redeem this gift') {
					  return console.log(Chalk.orange(`Couldn't claim Nitro. You cannot claim for self!`))
					}
					
					if (ParsedJSON.message == 'Unknown Gift Code') {
					  return console.log(Chalk.yellow(`Couldn't claim Nitro. Unknown Gift Code!`));
					} 
					
					if (ParsedJSON.subscription_plan) {
                        return console.log(Chalk.cyan(`You have successfully redeemed Nitro in Guild: ${Guild.name} with ID: ${Guild.id} using code: ${NitroCode}.`))
					} else {
                        console.log(Chalk.red(`The process has encountered an error with logging!`));
					} 
				})
			}
		}
	}
}

const Class_Sniper = new L0V3LYB00T2()
const Class_Process = new Class_Sniper.Dependencies.Eris(Settings.TokenToLogin);

Class_Process.on("messageCreate", (Message) => {
    return Class_Sniper.MessageHandler(Message);
})
Class_Process.connect().then(Next => {
	console.log(Class_Sniper.Dependencies.Chalk.magenta(`
	 ██▓     ▒█████   ██▒   █▓▓█████  ██▓   ▓██   ██▓ ▄▄▄▄    ▒█████   ▒█████  ▄▄▄█████▓  ██████ 
	▓██▒    ▒██▒  ██▒▓██░   █▒▓█   ▀ ▓██▒    ▒██  ██▒▓█████▄ ▒██▒  ██▒▒██▒  ██▒▓  ██▒ ▓▒▒██    ▒ 
	▒██░    ▒██░  ██▒ ▓██  █▒░▒███   ▒██░     ▒██ ██░▒██▒ ▄██▒██░  ██▒▒██░  ██▒▒ ▓██░ ▒░░ ▓██▄   
	▒██░    ▒██   ██░  ▒██ █░░▒▓█  ▄ ▒██░     ░ ▐██▓░▒██░█▀  ▒██   ██░▒██   ██░░ ▓██▓ ░   ▒   ██▒
	░██████▒░ ████▓▒░   ▒▀█░  ░▒████▒░██████▒ ░ ██▒▓░░▓█  ▀█▓░ ████▓▒░░ ████▓▒░  ▒██▒ ░ ▒██████▒▒
	░ ▒░▓  ░░ ▒░▒░▒░    ░ ▐░  ░░ ▒░ ░░ ▒░▓  ░  ██▒▒▒ ░▒▓███▀▒░ ▒░▒░▒░ ░ ▒░▒░▒░   ▒ ░░   ▒ ▒▓▒ ▒ ░
	░ ░ ▒  ░  ░ ▒ ▒░    ░ ░░   ░ ░  ░░ ░ ▒  ░▓██ ░▒░ ▒░▒   ░   ░ ▒ ▒░   ░ ▒ ▒░     ░    ░ ░▒  ░ ░
	  ░ ░   ░ ░ ░ ▒       ░░     ░     ░ ░   ▒ ▒ ░░   ░    ░ ░ ░ ░ ▒  ░ ░ ░ ▒    ░      ░  ░  ░  
		░  ░    ░ ░        ░     ░  ░    ░  ░░ ░      ░          ░ ░      ░ ░                 ░  
						  ░                  ░ ░           ░                                                                                                                                                       
	`))
	console.log(Class_Sniper.Dependencies.Chalk.green(`L0V3LYB00T2 HAS SUCCESSFULLY CONNECTED TO ACCT WITH TOKEN! THIS PROJECT HAS BEEN DEVELOPED BY GEN0C1DE ON GITHUB.`));
	console.log(Class_Sniper.Dependencies.Chalk.magenta(`NOW LOGGING ALL DISCORD SERVERS FOR NITRO GIFTS!`));
	console.table([{Colors: "Red", Description: "Most likely an error has occured with the process."}, {Colors: "Yellow", Description: "Unable to claim gift due to server recognition, or someone has already claimed the gift."}, {Colors: "Orange", Description: "Self aware recognition, discord not allowing you to claim nitro you buy!"}, {Colors: "Green", Description: "Connection successful."}, {Colors: "Cyan", Description: "Snipe successful."}]);
	//console.clear()
}).catch(Error => {
    if (Error) console.error(Class_Sniper.Dependencies.Chalk.red(`L0V3LYB00T2 HAS ENCOUNTERED A CONNECTION ERROR: ${Error}`));
})

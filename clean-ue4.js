/* 
cleans .pdb and intermediate folders from ue4 projects and plugins.
Requires verbose input (--p ..) because this deletes files so you are aware of what is happening.
Use -x if lazy
Use -d to preview what you would've deleted
*/

const fs = require('fs');
const del = require('del');
const pathUtil = require('path');
const colors = require('colors');
const util = require('util');
const readline = require('readline');

const pReaddir = util.promisify(fs.readdir);
const pUnlink = util.promisify(fs.unlink);

const scriptFilePath = __filename;
const fileName = scriptFilePath.substring(scriptFilePath.lastIndexOf('\\')+1);

//parse arguments into object
const argv = require('minimist')(process.argv.slice(2));
const unrestricted = argv.u != undefined;

const isInNodeModules = scriptFilePath.endsWith('\\node_modules\\clean-ue4\\clean.js');

//check args
if (process.argv.length <= 2) {
	console.log("Usage: ".bold, fileName, "--p".gray, "path/to/directory (requires .. without -u)",
		"\n-y auto confirm".gray, 
		"\n-u unrestricted location".gray,
		"\n-i del intermediate folders".gray,
		"\n-b del pdbs".gray,
		"\n-s del saved".gray,
		"\n-d dry run".gray,
		"\n-x (lazy option) del everything default location".gray);
	process.exit(-1);
}

if(argv.x){
	argv.p = '..';
	argv.i = true;
	argv.b = true;
	argv.s = true;
	argv.y = true;
}

const searchPath = pathUtil.resolve(argv.p);
const autoYes = argv.y != undefined;
const relativePath = pathUtil.relative(scriptFilePath, searchPath);

let defaultPath = '..\\..';
if(isInNodeModules){
	defaultPath = '..\\..\\..';
}

//path restriction test
if(!unrestricted && relativePath != defaultPath){
	console.log('Error!'.red, searchPath.gray,'path not allowed without unrestricted mode', '(-u)'.gray + '.', 'Default path should be', '--p'.gray, '..');
	process.exit(-1);
}

if(!fs.existsSync(searchPath)){
	console.log('Error!'.red, searchPath.gray, "directory doesn't exist.");
	process.exit(-1);
}

console.log('Cleaning project: ' + searchPath.bold);

//expects that the files have been checked
async function onAnswer(answer, files){
	if(answer == 'y' || answer == 'yes'){
		let options = {force:true};
		if(argv.d){
			options.dryRun = true;
		}

		//deleting files
		let deletedPaths = await del(files, options);

		if(options.dryRun){
			console.log("Dry run, would've deleted".bold, deletedPaths);
		}
		else{
			console.log('Deleted'.red, deletedPaths);
		}


		//deleting folders
	}
	else{
		console.log('Action canceled.'.green.bold);
	}
}

async function deleteFilesSafe(files){
	//Sanity checks, check that we're contained inside searchpath
	if(!scriptFilePath.startsWith(searchPath)){
		console.log('Not valid deletion, move script within searchpath and closer.');
		rl.close();
	}

	//ensure files all start with searchPath
	const finalFiles = files.filter(file => file.startsWith(searchPath));
	console.log('final patterns:', finalFiles);

	if(finalFiles.length == 0){
		console.log('No files found'.red);
		return;
	}	

	if(autoYes){
		onAnswer('y', finalFiles);
	}
	else{
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question('Delete files? ', answer =>{
			onAnswer(answer, finalFiles);
			rl.close();
		});
	}
}

//find intermediate of project
async function cleanFileList(){
	let patterns = [];

	//intermediate
	if(argv.i){
		let folderName = 'Intermediate';
		let intermediatePatterns = 	[folderName, 
									'Plugins/*/'+ folderName];
		patterns.push(...intermediatePatterns);
	}
	//pdbs
	if(argv.b){
		let pdbEnd = '*.pdb';
		let pdbPatterns = 	['Binaries/**/' + pdbEnd, 
							'Plugins/**/'+ pdbEnd];
		patterns.push(...pdbPatterns);
	}
	//saved
	if(argv.s){
		patterns.push('Saved');
	}
	patterns = patterns.map(pattern=> searchPath + '/' + pattern);

	deleteFilesSafe(patterns);
};

cleanFileList();
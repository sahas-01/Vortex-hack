import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json"
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json"
import HackathonManager from "../artifacts/contracts/HackathonManager.sol/HackathonManager.json"


import { Acontract_add, Ccontract_add, contract_add } from "../artifacts/config";

export const chainIdToContractMap = {
    421614: {
        abi: AHackathonManager.abi,
        address: Acontract_add,
    },
    1115: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    },
    534351: {
        abi: HackathonManager.abi, // Assuming you have a different ABI for this chain
        address: contract_add,
    }
};
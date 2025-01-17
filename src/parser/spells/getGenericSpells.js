// Import parsing functions
import { fixSpells } from "./special.js";
import { parseSpell } from "./parseSpell.js";

export function getSpells(spells) {
  let items = [];

  spells.filter((spell) => {
    // remove archived material
    if (spell.definition.sources && spell.definition.sources.some((source) => source.sourceId === 39)) {
      return false;
    } else {
      return true;
    }
  })
    .forEach((spell) => {
      if (!spell.definition) return;

      spell.flags = {
        ddbimporter: {
          generic: true,
          dndbeyond: {
            lookup: "generic",
            lookupName: "generic",
            level: spell.castAtLevel,
            castAtLevel: spell.castAtLevel,
          },
        },
      };

      items.push(parseSpell(spell, null));
    });

  if (items) fixSpells(null, items);

  return items;
}

// Service registry: order here drives the menu, footer and homepage index.
import garage from './garage-epoxy.mjs';
import residential from './residential-floors.mjs';
import flake from './decorative-flake.mjs';
import metallic from './metallic-epoxy-floors.mjs';
import polyaspartic from './polyaspartic-floors.mjs';
import polyurea from './polyurea-floors.mjs';
import patio from './outdoor-concrete-coatings.mjs';
import commercial from './business-floor-coatings.mjs';

export const services = [garage, residential, flake, metallic, polyaspartic, polyurea, patio, commercial];
export const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

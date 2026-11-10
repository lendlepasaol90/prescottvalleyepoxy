// Service registry: order here drives the menu, footer and homepage index.
import garage from './garage-floor-coatings.mjs';
import residential from './residential-epoxy-flooring.mjs';
import flake from './decorative-flake-flooring.mjs';
import metallic from './metallic-epoxy-flooring.mjs';
import polyaspartic from './polyaspartic-floor-coatings.mjs';
import polyurea from './polyurea-floor-coatings.mjs';
import patio from './patio-concrete-coatings.mjs';
import commercial from './commercial-epoxy-flooring.mjs';
import warehouse from './warehouse-floor-coatings.mjs';

export const services = [garage, residential, flake, metallic, polyaspartic, polyurea, patio, commercial, warehouse];
export const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export type Teema = 'kissat' | 'koirat' | 'opettajat' | 'tikologot';

export const pelinTila = $state({
	pisteet: 0,
	siirrot: 0,
	vaikeustaso: 'keskivaikea',
	teema: 'kissat' as Teema
});

export async function haeTeemanData(teema: Teema) {
	const response = await fetch(`/data/${teema}.json`);
	return response.json();
}

export function haeKuvanPolku(teema: Teema, kuvanNimi: string): string {
	return `/data/${teema}/${kuvanNimi}`;
}

export function asetaTeema(uusiTeema: Teema) {
	pelinTila.teema = uusiTeema;
}

import { TestBed, inject } from '@angular/core/testing';

import { TipoServicoService } from './tipo-servico.service';

describe('TipoServicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoServicoService]
    });
  });

  it('should be created', inject([TipoServicoService], (service: TipoServicoService) => {
    expect(service).toBeTruthy();
  }));
});

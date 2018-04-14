import { TestBed, inject } from '@angular/core/testing';

import { ServicoService } from './servico.service';

describe('ServicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoService]
    });
  });

  it('should be created', inject([ServicoService], (service: ServicoService) => {
    expect(service).toBeTruthy();
  }));
});

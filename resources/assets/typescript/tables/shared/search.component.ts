import { Component, Input } from '@angular/core';


@Component({
    selector: 'search-bar',
    template: `
<div class="dropdown">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="collapse" aria-haspopup="true" aria-expanded="false">
        Small button
        </button>
        <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="collapse" aria-haspopup="true" aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <a href="#" class="dropdown-item">test</a>
        </div>
</div>
    `
})
export class SearchBarComponent {
    @Input() table: string;
}

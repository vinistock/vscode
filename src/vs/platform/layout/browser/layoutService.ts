/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDimension } from 'vs/base/browser/dom';
import { Event } from 'vs/base/common/event';
import { DisposableStore } from 'vs/base/common/lifecycle';
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';

export const ILayoutService = createDecorator<ILayoutService>('layoutService');

export interface ILayoutOffsetInfo {

	/**
	 * Generic top offset
	 */
	readonly top: number;

	/**
	 * Quick pick specific top offset.
	 */
	readonly quickPickTop: number;
}

export interface ILayoutService {

	readonly _serviceBrand: undefined;

	/**
	 * An event that is emitted when the main container is layed out.
	 */
	readonly onDidLayoutMainContainer: Event<IDimension>;

	/**
	 * An event that is emitted when any container is layed out.
	 */
	readonly onDidLayoutContainer: Event<{ container: HTMLElement; dimension: IDimension }>;

	/**
	 * An event that is emitted when the active container is layed out.
	 */
	readonly onDidLayoutActiveContainer: Event<IDimension>;

	/**
	 * An event that is emitted when a new container is added. This
	 * can happen in multi-window environments.
	 */
	readonly onDidAddContainer: Event<{ container: HTMLElement; disposables: DisposableStore }>;

	/**
	 * An event that is emitted when the active container changes.
	 */
	readonly onDidChangeActiveContainer: Event<void>;

	/**
	 * The dimensions of the main container.
	 */
	readonly mainContainerDimension: IDimension;

	/**
	 * The dimensions of the active container.
	 */
	readonly activeContainerDimension: IDimension;

	/**
	 * Main container of the application.
	 *
	 * **NOTE**: In the standalone editor case, multiple editors can be created on a page.
	 * Therefore, in the standalone editor case, there are multiple containers, not just
	 * a single one. If you ship code that needs a "container" for the standalone editor,
	 * please use `activeContainer` to get the current focused code editor and use its
	 * container if necessary. You can also instantiate `EditorScopedLayoutService`
	 * which implements `ILayoutService` but is not a part of the service collection because
	 * it is code editor instance specific.
	 *
	 */
	readonly mainContainer: HTMLElement;

	/**
	 * Active container of the application. When multiple windows are opened, will return
	 * the container of the active, focused window.
	 */
	readonly activeContainer: HTMLElement;

	/**
	 * All the containers of the application. There can be one container per window.
	 */
	readonly containers: Iterable<HTMLElement>;

	/**
	 * Get the container for the given window.
	 */
	getContainer(window: Window): HTMLElement;

	/**
	 * An offset to use for positioning elements inside the main container.
	 */
	readonly mainContainerOffset: ILayoutOffsetInfo;

	/**
	 * An offset to use for positioning elements inside the container.
	 */
	readonly activeContainerOffset: ILayoutOffsetInfo;

	/**
	 * Focus the primary component of the active container.
	 */
	focus(): void;
}

<?php

namespace Apps\Api\Controllers;

use Apps\Models\Hook;

/**
 * Description of Hook.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/hook")
 */
class HookController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $hooks = Hook::find([
            'order' => 'Nice DESC',
        ]);
        if ($hooks) {
            $this->content = json_encode(['items' => $hooks->toArray()]);
        } else {
            $this->content = json_encode(['items' => []]);
        }
    }
    /**
     * @Get("/list/active")
     */
    public function activelistAction()
    {
        $hooks = Hook::find([
            'conditions' => "Active='1'",
            'order' => 'Nice DESC',
        ]);
        if ($hooks) {
            $this->content = json_encode(['items' => $hooks->toArray()]);
        } else {
            $this->content = json_encode(['items' => []]);
        }
    }
    /**
     * createAction.
     *
     * @Post("/create")
     */
    public function createAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $hook = json_decode($data);
        $p_query = $this->db->query("SHOW PROCEDURE STATUS LIKE '{$hook->ProcName}'");
        $p_query->setFetchMode(\Phalcon\Db::FETCH_ASSOC);
        $procedures = $p_query->fetchAll();
        if ($hook->Type == 'procedure') {
            foreach ($procedures as $proc) {
                if ($proc['Db'] == $this->config->maindb->dbname) {
                    if ($this->_savehook($hook)) {
                        return $this->content = json_encode([
                            'result' => 'success',
                        ]);
                    } else {
                        return $this->content = json_encode([
                            'result' => 'error',
                            'message' => 'create error',
                        ]);
                    }
                }
            }
        }
        if ($hook->Type == 'script') {
            $scripts = $this->_TreeList($this->config->hooks_dir);
            if (in_array($hook->ProcName, $scripts)) {
                if ($this->_savehook($hook)) {
                    return $this->content = json_encode([
                        'result' => 'success',
                    ]);
                } else {
                    return $this->content = json_encode([
                        'result' => 'error',
                        'message' => 'create error',
                    ]);
                }
            }

            return $this->content = json_encode([
                'result' => 'error',
                'message' => 'script does not exists',
            ]);
        }

        return $this->content = json_encode([
            'result' => 'error',
            'message' => 'procedure does not exists',
        ]);
    }

    /**
     * storeAction.
     *
     * @Post("/store")
     */
    public function storeAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $hook = json_decode($data);
        $p_query = $this->db->query("SHOW PROCEDURE STATUS LIKE '{$hook->ProcName}'");
        $p_query->setFetchMode(\Phalcon\Db::FETCH_ASSOC);
        $procedures = $p_query->fetchAll();
        if ($hook->Type == 'procedure') {
            foreach ($procedures as $proc) {
                if ($proc['Db'] == $this->config->maindb->dbname) {
                    if ($this->_storehook($hook)) {
                        return $this->content = json_encode([
                            'result' => 'success',
                        ]);
                    } else {
                        return $this->content = json_encode([
                            'result' => 'error',
                            'message' => 'create error',
                        ]);
                    }
                }
            }
        }
        if ($hook->Type == 'script') {
            $scripts = $this->_TreeList($this->config->hooks_dir);
            if (in_array($hook->ProcName, $scripts)) {
                if ($this->_storehook($hook)) {
                    return $this->content = json_encode([
                        'result' => 'success',
                    ]);
                } else {
                    return $this->content = json_encode([
                        'result' => 'error',
                        'message' => 'create error',
                    ]);
                }
            }

            return $this->content = json_encode([
                'result' => 'error',
                'message' => 'script does not exists',
            ]);
        }

        return $this->content = json_encode([
            'result' => 'error',
            'message' => 'procedure does not exists',
        ]);
    }

    /**
     * changestatus.
     *
     * @Post("/changestatus")
     */
    public function changestatusAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $hook_src = json_decode($data);
        $hook = Hook::findFirst([
            'conditions' => "id='{$hook_src->id}'",
        ]);
        $hook->Active = $hook_src->Active;
        if ($hook->update()) {
            return $this->content = json_encode([
                'result' => 'success',
            ]);
        }
        foreach ($hook->getMessages() as $message) {
            $message .= $message;
        }

        return $this->content = json_encode([
            'result' => 'error',
            'message' => $message,
            'hook' => $hook->toArray(),
        ]);
    }

    /**
     * delete hook.
     *
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $hook_src = json_decode($data);
        $hook = Hook::findFirst([
            'conditions' => "id='{$hook_src->id}'",
        ]);
        if ($hook->delete()) {
            return $this->content = json_encode([
                'result' => 'success',
            ]);
        }
        foreach ($hook->getMessages() as $message) {
            $message .= $message;
        }

        return $this->content = json_encode([
            'result' => 'error',
            'message' => $message,
            'hook' => $hook->toArray(),
        ]);
    }

    /**
     * @Post("/apply")
     */
    public function applyAction()
    {
        exec($this->config->util_dir.'hooker >/dev/null 2>&1 &');
    }

    protected function _savehook($hook)
    {
        $new_hook = new Hook();
        $new_hook->Name = $hook->Name;
        $new_hook->ProcName = $hook->ProcName;
        $new_hook->Description = $hook->Description;
        $new_hook->Type = $hook->Type;
        $new_hook->Active = $hook->Active ? 1 : 0;
        $new_hook->Nice = $hook->Nice;
        if ($new_hook->create()) {
            return true;
        }

        return false;
    }

    protected function _storehook($hook)
    {
        $new_hook = new Hook();
        $new_hook->id = $hook->id;
        $new_hook->Name = $hook->Name;
        $new_hook->ProcName = $hook->ProcName;
        $new_hook->Description = $hook->Description;
        $new_hook->Type = $hook->Type;
        $new_hook->Active = $hook->Active ? 1 : 0;
        $new_hook->Nice = $hook->Nice ? $hook->Nice : 0;
        if ($new_hook->update()) {
            return true;
        }
        foreach ($new_hook->getMessages() as $message) {
            echo $message, "\n";
        }

        return false;
    }

    protected function _TreeList($dir)
    {
        $dir_array = @scandir($dir);
        $listing = [];
        if ($dir_array) {
            $files = array_diff($dir_array, ['.', '..']);
            foreach ($files as $file) {
                if (!is_dir($dir.$file)) {
                    $listing[] = $file;
                }
            }

            return $listing;
        }

        return [];
    }
}

<?php

namespace App\Dto;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "post"={
 *              "path"="/users/forgot-password-request",
 *          },
 *      },
 *      itemOperations={},
 * )
 */

final class ForgotPasswordRequest
{
    /**
     * @Assert\NotBlank(message="email est obligatoire !")
     * @Assert\Email(message="email invalid")
     */
    private $email;

    public function getEmail() : string
    {
    	return (string) $this->email;
    }

    public function setEmail(string $email) : void
    {
    	$this->email = $email;
    }
}